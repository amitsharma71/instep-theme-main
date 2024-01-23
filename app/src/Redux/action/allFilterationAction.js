import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBasePath } from "../config/Config";

export const axiosInstance = axios.create({
  baseURL: apiBasePath,
});

// export const AllFilterationData = AllFilterationData("filterationAlldata",
//   async (payload) => {
//     const data1 = await axiosInstance.post(`/filteralldata`, payload);    // http://localhost:5000/api/filteralldata
//     return data1.data;
//   }
// );

export const AllFilterationData = createAsyncThunk(
  "filterationAlldata",
  async (payload) => {
    return axiosInstance.post(
      `/filteralldata?subcategoryId=${payload?.subcategoryId}`,
      payload
    );
  }
);
