import {CreateStudentData} from "@/validators/api/studentApiValidators"
import { ApiSlice } from "@/redux/services/apiSlice";
import { UserRole,AppointmentStatus } from "@/types/types";

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

export interface StudentSearchResponseData{
    id: number;
        studentId: string;
        fullName: string;
        degree: string;
        enrollmentDate: string;
        expectedGraduationDate:
          string;
        degreePercentCompletion:number;
        completedCredits:number;
        remainingCredits:number;
        requiredCredits:number;
        nextAppointment:string;
        nextAppointmentStatus:AppointmentStatus
        studentProfileImage:string;
}
interface StudentSearchQueryParams{
    search?:string|undefined
}

const studentApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createStudent:builder.mutation<StudentResponseData, {userId:number, formData:CreateStudentData}>({
            query:({userId, formData})=>({
                url:`/users/${userId}/student`,
                method:"POST",
                body:formData
            }),
            invalidatesTags:["Students"]
        }),
        getStudentsWithSearchFilter:builder.query<StudentSearchResponseData[], StudentSearchQueryParams>({
            query:({search})=>({
                url:`/students`,
                method:"GET",
                params:{
                    search:search
                }
            }),
            providesTags:["Students"]
        }),
        getStudentByStudentId:builder.query<StudentSearchResponseData, {studentId:number, timeZone:string}>({
            query:({studentId, timeZone})=>({
                url:`/students/${studentId}`,
                method:"GET",
                params: new URLSearchParams({timeZone})
            }),
            providesTags:(data)=>data?["Students", {type:"Students", id:data.id}]:[]
        }),
        
        
    })
})

export const {useCreateStudentMutation, useGetStudentsWithSearchFilterQuery, useGetStudentByStudentIdQuery} =studentApiSlice
export default studentApiSlice.reducer