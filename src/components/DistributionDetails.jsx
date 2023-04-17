import React from "react";
import { useSelector } from "react-redux";

const DistributionDetails = () => {
  const productState = useSelector((state) => state?.product?.products);
  const progressCount = productState?.filter(
    (item) => item?.status === "In Progress"
  )?.length;
  const resolvedCount = productState?.filter(
    (item) => item?.status === "Resolved"
  )?.length;
  const pendingCount = productState?.filter(
    (item) => item?.status === "Submitted"
  )?.length;
  return (
    <div className="d-flex justify-content-between align-items-center gap-3">
      <h6 className="d-flex justify-content-between align-items-end flex-grow-1 bg-success text-white p-3 rounded-3">
        সম্পন্ন হয়েছেঃ ({resolvedCount}) জনের
      </h6>
      <h6 className="d-flex justify-content-between align-items-end flex-grow-1 bg-danger text-white p-3 rounded-3">
        পেন্ডিং আছেঃ ({pendingCount}) জনের
      </h6>
      <h6 className="d-flex justify-content-between align-items-end flex-grow-1 bg-warning text-white p-3 rounded-3">
        তথ্য নেইঃ ({progressCount}) জনের
      </h6>
    </div>
  );
};

export default DistributionDetails;
