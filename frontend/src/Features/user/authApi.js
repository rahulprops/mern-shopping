import { apiSlice } from "../../app/apiSlice";

const authApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(inputData)=>({
                url:"/user/create",
                method:"POST",
                body:inputData
            })
        })
    })
})
export const  {useRegisterMutation}=authApi;