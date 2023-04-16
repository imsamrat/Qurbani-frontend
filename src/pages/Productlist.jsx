import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetState,
  deleteAProduct,
  updateAMember,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import calculateSum from "../utils/calculateSum";
import { getBrands } from "../features/brand/brandSlice";

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
  },
  {
    title: "Action",
    dataIndex: "action",
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
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          {/* <Link to={`/admin/product/${productState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link> */}
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
    const data = { id: i, memberData: e };
    dispatch(updateAMember(data));
  };

  const deleteProd = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts(e));
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">সদস্যের তালিকা</h3>
      <Link to="/admin/product">সদস্য যোগ করুন</Link>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-primary text-white p-3 rounded-3">
          <div>
            <p className="">টোটাল সদস্য সংখ্যাঃ </p>
            <h4 className="mb-0">{totalMember} জন</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-info text-white p-3 rounded-3">
          <div>
            <p className="">টোটাল পরিবারের সংখ্যাঃ </p>
            <h4 className="mb-0">{productState?.length} খানা</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-secondary text-white p-3 rounded-3">
          <div>
            <p className="">মাথাপিছু মাংসের পরিমাণঃ </p>
            <h4 className="mb-0">
              {Math.floor(sumOfMeat / totalMember)} গ্রাম
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-danger text-white p-3 rounded-3">
          <div>
            <p className="">মাথাপিছু হাড্ডির পরিমাণঃ </p>
            <h4 className="mb-0">
              {Math.floor(sumOfBone / totalMember)} গ্রাম
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-success text-white p-3 rounded-3">
          <div>
            <p className="">মাথাপিছু কলিজার পরিমাণঃ</p>
            <h4 className="mb-0">
              {Math.floor(sumOfLiver / totalMember)} গ্রাম
            </h4>
          </div>
        </div>
      </div>
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
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Productlist;
