import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const updateMember = async (member) => {
  const response = await axios.put(
    `${base_url}product/${member.id}`,
    { englishName: member.productData.englishName,banglaName: member.productData.banglaName,fatherName: member.productData.fatherName,member: member.productData.member},
    config
  );
  return response.data;
};

const updateAStatus = async (status) => {
  const response = await axios.put(`${base_url}product/${status.id}`,{status:status.statusData},config);
  return response.data;
};

const getMember = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};

const deleteMember = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);

  return response.data;
};





const productService = {
  getProducts,
  getMember,
  createProduct,
  deleteMember,
  updateAStatus,
  updateMember
};

export default productService;
