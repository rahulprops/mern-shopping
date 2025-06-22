import { apiSlice } from "../../app/apiSlice";

const authApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(inputData)=>({
                url:"/user/create",
                method:"POST",
                body:inputData
            })
        }),
        login:builder.mutation({
            query:(inputData)=>({
                url:"user/login",
                method:'POST',
                body:inputData
            })
        })
    })
})
export const  {useRegisterMutation,useLoginMutation}=authApi;