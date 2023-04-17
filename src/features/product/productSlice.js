import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAMember = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getMember(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAMember = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteMember(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateAMember = createAsyncThunk(
  "product/update-member",
  async (member, thunkAPI) => {
    try {
      return await productService.updateMember(member);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "product/update-status",
  async (status, thunkAPI) => {
    try {
      return await productService.updateAStatus(status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(getAMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.memberEngName = action.payload.englishName;
        state.memberBngName = action.payload.banglaName;
        state.memberFatherName = action.payload.fatherName;
        state.memberCount = action.payload.member;
      })
      .addCase(getAMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedMember = action.payload;
        if(state.isSuccess){
          toast.success("সদস্য ডিলিট সম্পন্ন হয়েছে!")
        }
      })
      .addCase(deleteAMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError){
          toast.success("কোথাও ভুল হয়েছে!")
        }
      })
      .addCase(updateAMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedMember = action.payload;
      })
      .addCase(updateAMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedStatus = action.payload;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
