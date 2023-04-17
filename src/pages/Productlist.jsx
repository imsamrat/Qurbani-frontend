import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetState,
  deleteAMember,
  updateAMember,
  updateStatus,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import calculateSum from "../utils/calculateSum";
import { getBrands } from "../features/brand/brandSlice";
import DistributionDetails from "../components/DistributionDetails";
import MemberDetails from "../components/MemberDetails";

const columns = [
  {
    title: "নং",
    dataIndex: "key",
  },
  {
    title: "নাম (ইংরেজি)",
    dataIndex: "englishName",
    sorter: (a, b) => a.englishName.length - b.englishName.length,
  },
  {
    title: "নাম (বাংলা)",
    dataIndex: "banglaName",
    sorter: (a, b) => a.banglaName.length - b.banglaName.length,
  },
  {
    title: "বাবার নাম",
    dataIndex: "fatherName",
    sorter: (a, b) => a.fatherName.length - b.fatherName.length,
  },
  {
    title: "সদস্য সংখ্যা",
    dataIndex: "member",
    sorter: (a, b) => a.member - b.member,
  },
  {
    title: "মাংসের পরিমাণ",
    dataIndex: "meatQuantity",
    sorter: (a, b) => a.meatQuantity - b.meatQuantity,
  },
  {
    title: "হাড্ডির পরিমাণ",
    dataIndex: "boneQuantity",
    sorter: (a, b) => a.boneQuantity - b.boneQuantity,
  },
  {
    title: "কলিজার পরিমাণ",
    dataIndex: "liverQuantity",
    sorter: (a, b) => a.liverQuantity - b.liverQuantity,
  },
  {
    title: "স্ট্যাটাস",
    dataIndex: "status",
    width: 150,
  },
  {
    title: "অ্যাকশন",
    dataIndex: "action",
    width: 120,
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [prodId, setProdId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProdId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
    dispatch(getBrands());
  }, []);
  const productState = useSelector((state) => state?.product?.products);
  const brandState = useSelector((state) => state?.brand?.brands);
  const totalMember = calculateSum(productState, "member");
  const sumOfMeat = calculateSum(brandState, "meatQuantity");
  const sumOfBone = calculateSum(brandState, "boneQuantity");
  const sumOfLiver = calculateSum(brandState, "liverQuantity");

  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    const perPersonMeat = Math.floor(sumOfMeat / totalMember);
    const perPersonBone = Math.floor(sumOfBone / totalMember);
    const perPersonLiver = Math.floor(sumOfLiver / totalMember);
    data1.push({
      key: i + 1,
      englishName: productState[i]?.englishName,
      banglaName: productState[i]?.banglaName,
      fatherName: productState[i]?.fatherName,
      member: `${productState[i]?.member}`,
      meatQuantity: `${productState[i]?.member}` * perPersonMeat,
      boneQuantity: `${productState[i]?.member}` * perPersonBone,
      liverQuantity: `${productState[i]?.member}` * perPersonLiver,
      status: (
        <>
          <select
            name=""
            defaultValue={
              productState[i]?.status ? productState[i]?.status : "Submitted"
            }
            className={
              productState[i]?.status === "Submitted"
                ? "btn btn-danger form-control"
                : productState[i]?.status === "Resolved"
                ? "btn btn-success form-control"
                : productState[i]?.status === "In Progress"
                ? "btn btn-warning form-control"
                : "btn btn-info form-control"
            }
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, productState[i]?._id)
            }
          >
            <option value="Submitted">পেন্ডিং আছে</option>
            <option value="In Progress">তথ্য নেই</option>
            <option value="Resolved">সম্পন্ন হয়েছে</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className=" fs-3 text-primary"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, statusData: e };
    dispatch(updateStatus(data));
    setTimeout(() => {
      dispatch(getProducts(e));
    }, 1000);
  };

  const deleteProd = (e) => {
    dispatch(deleteAMember(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts(e));
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">সদস্যের তালিকা</h3>
      <Link to="/admin/product">সদস্য যোগ করুন</Link>
      <DistributionDetails />
      <br />
      <MemberDetails />
      <br />
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProd(prodId);
        }}
        title="আপনি কি এই সদস্য ডিলিট করতে চাচ্ছেন?"
      />
    </div>
  );
};

export default Productlist;
