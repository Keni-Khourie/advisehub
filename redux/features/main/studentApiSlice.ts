import {CreateStudentData} from "@/validators/api/studentApiValidators"

import { ApiSlice } from "@/redux/services/apiSlice";
import { UserRole } from "@/types/types";

export interface StudentResponseData{
 completedCredits: number;
 createdAt: Date;
 degree: {
 code: string;
 degreeName: string;
 id: number;
 requiredCredits: number;
 };
 enrollmentDate: Date;
 expectedGraduationDate: Date;
 firstName: string;
 id: number;
 lastName: string;
 studentId: string;
 user: {
 email: string;
 id: number;
 role: UserRole | null;
 };

}

const studentApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createStudent:builder.mutation<StudentResponseData, {userId:number, formData:CreateStudentData}>({
            query:({userId, formData})=>({
                url:`api/users/${userId}/student`,
                method:"POST",
                body:formData
            }),
            invalidatesTags:["Students"]
        }),
        
    })
})

export const {useCreateStudentMutation} =studentApiSlice
export default studentApiSlice.reducer