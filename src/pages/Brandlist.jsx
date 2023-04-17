import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABrand,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import DonorDetails from "../components/DonorDetails";
import calculateSum from "../utils/calculateSum";

const columns = [
  {
    title: "নং",
    dataIndex: "key",
  },
  {
    title: "ডোনারের নাম",
    dataIndex: "donorName",
    sorter: (a, b) => a.donorName.length - b.donorName.length,
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
    title: "অ্যাকশন",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state?.brand?.brands);
  const data1 = [];
  for (let i = 0; i < brandState?.length; i++) {
    data1.push({
      key: i + 1,
      donorName: brandState[i]?.donorName,
      meatQuantity: brandState[i]?.meatQuantity,
      boneQuantity: brandState[i]?.boneQuantity,
      liverQuantity: brandState[i]?.liverQuantity,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]?._id}`}
            className="fs-3 text-primary"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">ডোনারের তালিকা</h3>
      <Link to="/admin/brand">ডোনার যোগ করুন</Link>
      <DonorDetails />
      <br />
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="আপনি কি এই ডোনার ডিলিট করতে চাচ্ছেন?"
      />
    </div>
  );
};

export default Brandlist;
