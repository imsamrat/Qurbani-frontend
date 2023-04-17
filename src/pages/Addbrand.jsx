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
  donorName: yup.string().required("ইংলিশে আপনার নাম লিখুন"),
  meatQuantity: yup.number().required("মাংসের পরিমাণ (গ্রাম)"),
  boneQuantity: yup.number().required("হাড্ডির পরিমাণ (গ্রাম)"),
  liverQuantity: yup.number().required("কলিজার পরিমাণ (গ্রাম)"),
});
const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state?.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    donorName,
    donorMeatQuantity,
    donorBoneQuantity,
    donorLiverQuantity,
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
      toast.success("ডোনার সফলভাবে এড হয়েছে");
    }
    if (isSuccess && updatedBrand) {
      toast.success("ডোনার সফলভাবে আপডেট হয়েছে");
      navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("কোথাও ভুল হয়েছে!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      donorName: donorName || "",
      meatQuantity: donorMeatQuantity || "",
      boneQuantity: donorBoneQuantity || "",
      liverQuantity: donorLiverQuantity || "",
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
      ডোনার {getBrandId !== undefined ? "ইডিট" : "এড"} করুন 
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="donorName"
            onChng={formik.handleChange("donorName")}
            onBlr={formik.handleBlur("donorName")}
            val={formik.values.donorName}
            label="দাতার নাম"
            id="brand"
          />
          <div className="error">
            {formik.touched.donorName && formik.errors.donorName}
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
           ডোনার {getBrandId !== undefined ? "ইডিট" : "যোগ"} করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
