import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Table } from "antd";
import { useSelector } from "react-redux";
import calculateSum from "../utils/calculateSum";

const Dashboard = () => {
  const brandState = useSelector((state) => state?.brand?.brands);
  const productState = useSelector((state) => state?.product?.products);
  const sumOfMeat = calculateSum(brandState, "meatQuantity");
  const sumOfBone = calculateSum(brandState, "boneQuantity");
  const sumOfLiver = calculateSum(brandState, "liverQuantity");


  const totalMember = calculateSum(productState, "member");
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <p>ডোনারের তথ্যঃ</p>
      <div className="d-flex justify-content-between align-items-center gap-3">
      <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-primary text-white p-3 rounded-3">
          <div>
            <p className="">টোটাল ডোনারের সংখ্যাঃ </p>
            <h4 className="mb-0">{brandState?.length} জন</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-secondary text-white p-3 rounded-3">
          <div>
            <p className="">সর্বোমোট মাংসের পরিমাণঃ </p>
            <h4 className="mb-0">{sumOfMeat} গ্রাম</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-success text-white p-3 rounded-3">
          <div>
            <p className="">সর্বোমোট হাড্ডির পরিমাণঃ </p>
            <h4 className="mb-0">{sumOfBone} গ্রাম</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-danger text-white p-3 rounded-3">
          <div>
            <p className="">সর্বোমোট কলিজার পরিমাণঃ</p>
            <h4 className="mb-0">{sumOfLiver} গ্রাম</h4>
          </div>
        </div>
      </div>
      <br />
      <p>সদস্যের তথ্যঃ</p>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-primary text-white p-3 rounded-3">
          <div>
            <p className="">টোটাল সদস্য সংখ্যাঃ </p>
            <h4 className="mb-0">{totalMember || 0} জন</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-info text-white p-3 rounded-3">
          <div>
            <p className="">টোটাল পরিবারের সংখ্যাঃ </p>
            <h4 className="mb-0">{productState?.length || 0} খানা</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-secondary text-white p-3 rounded-3">
          <div>
            <p className="">মাথাপিছু মাংসের পরিমাণঃ </p>
            <h4 className="mb-0">
              {Math.floor(sumOfMeat / totalMember || 0)} গ্রাম
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-danger text-white p-3 rounded-3">
          <div>
            <p className="">মাথাপিছু হাড্ডির পরিমাণঃ </p>
            <h4 className="mb-0">
              {Math.floor(sumOfBone / totalMember || 0)} গ্রাম
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-success text-white p-3 rounded-3">
          <div>
            <p className="">মাথাপিছু কলিজার পরিমাণঃ</p>
            <h4 className="mb-0">
              {Math.floor(sumOfLiver / totalMember || 0)} গ্রাম
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
