import React from "react";
import DonorDetails from "../components/DonorDetails";
import MemberDetails from "../components/memberDetails";
import DistributionDetails from "../components/DistributionDetails";

const Dashboard = () => {
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <p>ডোনারের তথ্যঃ</p>
      <DonorDetails />
      <br />
      <p>সদস্যের তথ্যঃ</p>
      <MemberDetails />
      <br />
      <p>বিতরণের তথ্যঃ</p>
      <DistributionDetails />
    </div>
  );
};

export default Dashboard;
