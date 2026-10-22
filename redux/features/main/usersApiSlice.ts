import { ApiSlice } from "@/redux/services/apiSlice";
import { UserRole } from "@/types/types";
import { AssignUserRoleData } from "@/validators/api/userApiValidators";

export interface UpdatedUser{
    id:number
    firstName:string;
    lastName:string;
    email:string;
    role:UserRole;
    updatedAt:string
}

const userApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        assignUserRole:builder.mutation<UpdatedUser, {userId: number, formData:AssignUserRoleData}>({
            query:({userId, formData})=>({
                url:`/users/${userId}`,
                method:"PATCH",
                body:formData
            }),
            invalidatesTags:["User"]
        }),
    })
})

export const {useAssignUserRoleMutation} =userApiSlice
export default userApiSlice.reducer