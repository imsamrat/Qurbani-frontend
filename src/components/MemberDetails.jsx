import React from "react";
import calculateSum from "../utils/calculateSum";
import { useSelector } from "react-redux";

const MemberDetails = () => {
  const brandState = useSelector((state) => state?.brand?.brands);
  const productState = useSelector((state) => state?.product?.products);
  const sumOfMeat = calculateSum(brandState, "meatQuantity");
  const sumOfBone = calculateSum(brandState, "boneQuantity");
  const sumOfLiver = calculateSum(brandState, "liverQuantity");

  const totalMember = calculateSum(productState, "member");
  return (
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
  );
};

export default MemberDetails;
