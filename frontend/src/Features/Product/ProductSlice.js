import { apiSlice } from "../../app/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: "/product", 
        method: "GET",
      }),
      transformResponse:(data)=>{
        return data.products
      }
    }),
  }),
});

export const { useGetProductQuery } = productApi;
