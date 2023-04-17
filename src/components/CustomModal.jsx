import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="কনফার্মেশন"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="ঠিক আছে"
      cancelText="কেন্সেল"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
