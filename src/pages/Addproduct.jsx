import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { Select } from "antd";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  updateAMember,
  getAMember,
  resetState,
} from "../features/product/productSlice";
let memberSchema = yup.object().shape({
  englishName: yup.string().required("ইংলিশে আপনার নাম লিখুন"),
  banglaName: yup.string().required("বাংলায় আপনার নাম লিখুন"),
  fatherName: yup.string().required("ইংলিশে আপনার বাবার নাম লিখুন"),
  member: yup.number().required("পরিবারের সদস্য সংখ্যা লিখুন").moreThan(0, 'পরিবারের সদস্য সংখ্যা শুন্য 0 থেকে বেশি হতে হবে।'),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProdId = location.pathname.split("/")[3];
  const newProduct = useSelector((state) => state?.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    memberEngName,
    memberBngName,
    memberFatherName,
    memberCount,
    updatedMember
  } = newProduct;

  useEffect(() => {
    if (getProdId !== undefined) {
      dispatch(getAMember(getProdId));
    } else {
      dispatch(resetState());
    }
  }, [getProdId]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("সদস্য সফলভাবে এড হয়েছে!");
    }
    if (isSuccess && updatedMember) {
      toast.success("সদস্য সফলভাবে আপডেট হয়েছে!");
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("কোথাও ভুল হয়েছে!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      englishName: memberEngName|| "",
      banglaName: memberBngName|| "",
      fatherName: memberFatherName || "",
      member: memberCount || "",
    },
    validationSchema: memberSchema,
    onSubmit: (values) => {
      if (getProdId !== undefined) {
        const data = { id: getProdId, productData: values };
        dispatch(updateAMember(data));
        dispatch(resetState());
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        সদস্য {getProdId !== undefined ? "ইডিট" : "এড"} করুন
      </h3>
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
            সদস্য {getProdId !== undefined ? "ইডিট" : "যোগ"} করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
