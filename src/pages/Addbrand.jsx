import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";

let schema = yup.object().shape({
  donerName: yup.string().required("ইংলিশে আপনার নাম লিখুন"),
  meatQuantity: yup.number().required("মাংসের পরিমাণ (গ্রাম)"),
  boneQuantity: yup.number().required("হাড্ডির পরিমাণ (গ্রাম)"),
  liverQuantity: yup.number().required("কলিজার পরিমাণ (গ্রাম)"),
});
const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully!");
      navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      donerName: brandName || "",
      meatQuantity: brandName || "",
      boneQuantity: brandName || "",
      liverQuantity: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
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
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="donerName"
            onChng={formik.handleChange("donerName")}
            onBlr={formik.handleBlur("donerName")}
            val={formik.values.donerName}
            label="দাতার নাম"
            id="brand"
          />
          <div className="error">
            {formik.touched.donerName && formik.errors.donerName}
          </div>
          <CustomInput
            type="number"
            name="meatQuantity"
            onChng={formik.handleChange("meatQuantity")}
            onBlr={formik.handleBlur("meatQuantity")}
            val={formik.values.meatQuantity}
            label="মাংসের পরিমাণ (গ্রাম)"
          />
          <div className="error">
            {formik.touched.meatQuantity && formik.errors.meatQuantity}
          </div>
          <CustomInput
            type="number"
            name="boneQuantity"
            onChng={formik.handleChange("boneQuantity")}
            onBlr={formik.handleBlur("boneQuantity")}
            val={formik.values.boneQuantity}
            label="হাড্ডির পরিমাণ (গ্রাম)"
          />
          <div className="error">
            {formik.touched.boneQuantity && formik.errors.boneQuantity}
          </div>
          <CustomInput
            type="number"
            name="liverQuantity"
            onChng={formik.handleChange("liverQuantity")}
            onBlr={formik.handleBlur("liverQuantity")}
            val={formik.values.liverQuantity}
            label="কলিজার পরিমাণ (গ্রাম)"
          />
          <div className="error">
            {formik.touched.liverQuantity && formik.errors.liverQuantity}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
