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
    ProductDetails:builder.query({
        query:(id)=>({
           url:`/product/${id}`,
           method:"GET"
        }),
        transformResponse:(data)=>{
        return data.product
      }
    })
  }),
});

export const { useGetProductQuery,useLazyProductDetailsQuery } = productApi;
