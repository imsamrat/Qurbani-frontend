import React from "react";
import { useSelector } from "react-redux";
import calculateSum from "../utils/calculateSum";

const DonorDetails = () => {
  const brandState = useSelector((state) => state?.brand?.brands);
  const sumOfMeat = calculateSum(brandState, "meatQuantity");
  const sumOfBone = calculateSum(brandState, "boneQuantity");
  const sumOfLiver = calculateSum(brandState, "liverQuantity");
  return (
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
  );
};

export default DonorDetails;
