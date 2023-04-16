import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { Select } from "antd";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
let schema = yup.object().shape({
  englishName: yup.string().required("ইংলিশে আপনার নাম লিখুন"),
  banglaName: yup.string().required("বাংলায় আপনার নাম লিখুন"),
  fatherName: yup.string().required("ইংলিশে আপনার বাবার নাম লিখুন"),
  member: yup.number().required("পরিবারের সদস্য সংখ্যা লিখুন"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  const formik = useFormik({
    initialValues: {
      englishName: "",
      banglaName: "",
      fatherName: "",
      member: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">সদস্য যোগ করুন</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="ইংলিশে আপনার নাম"
            name="englishName"
            onChng={formik.handleChange("englishName")}
            onBlr={formik.handleBlur("englishName")}
            val={formik.values.englishName}
          />
          <div className="error">
            {formik.touched.englishName && formik.errors.englishName}
          </div>
          <CustomInput
            type="text"
            label="বাংলায় আপনার নাম"
            name="banglaName"
            onChng={formik.handleChange("banglaName")}
            onBlr={formik.handleBlur("banglaName")}
            val={formik.values.banglaName}
          />
          <div className="error">
            {formik.touched.banglaName && formik.errors.banglaName}
          </div>
          <CustomInput
            type="text"
            label="ইংলিশে আপনার বাবার নাম"
            name="fatherName"
            onChng={formik.handleChange("fatherName")}
            onBlr={formik.handleBlur("fatherName")}
            val={formik.values.fatherName}
          />
          <div className="error">
            {formik.touched.fatherName && formik.errors.fatherName}
          </div>
          <CustomInput
            type="number"
            label="পরিবারের সদস্য সংখ্যা"
            name="member"
            onChng={formik.handleChange("member")}
            onBlr={formik.handleBlur("member")}
            val={formik.values.member}
          />
          <div className="error">
            {formik.touched.member && formik.errors.member}
          </div>
          
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            সদস্য যোগ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
