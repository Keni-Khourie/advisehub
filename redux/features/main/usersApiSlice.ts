import { ApiSlice } from "@/redux/services/apiSlice";
import { UserRole, User } from "@/types/types";
import { AssignUserRoleData } from "@/validators/api/userApiValidators";

export interface UpdatedUser{
    id:number
    firstName:string;
    lastName:string;
    email:string;
    role:UserRole;
    updatedAt:string
}
export interface UserResponseData {
     id: number;
        email: string,
        firstName: string,
        lastName: string,
        role: UserRole,
        image: string|null,
        createdAt: string,
        updatedAt: string,
}

const userApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        assignUserRole:builder.mutation<UpdatedUser, {userId: number, formData:AssignUserRoleData}>({
            query:({userId, formData})=>({
                url:`/users/${userId}`,
                method:"PATCH",
                body:formData
            }),
            invalidatesTags:(data)=>data?["User", {type:"User", id:data.id}]:[]
        }),
        getUnassignedUsers:builder.query<UpdatedUser[], void>({
            query:()=>({
                url:"/users/unassigned",
                method:"GET"
            }),
            providesTags:["User"]
        }),
        getUserById:builder.query<User, number>({
            query:(userId)=>({
                url:`/users/${userId}`,
                method:"GET"
            }),
            providesTags:(data)=>data?["User", {type:"User", id:data.id}]:[]
        }),
        getAllUsers:builder.query<UserResponseData[], void>({
            query:()=>({
                url:"/users",
                method:"GET"
            }),
            providesTags:["User"]
        }),
    })
})

export const {useAssignUserRoleMutation, useGetUnassignedUsersQuery, useGetUserByIdQuery, useGetAllUsersQuery} =userApiSlice
export default userApiSlice.reducer