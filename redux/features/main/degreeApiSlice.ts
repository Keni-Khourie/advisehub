import { ApiSlice } from "@/redux/services/apiSlice";
import {CreateDegreeData } from "@/validators/api/degreeApiValidators"

export interface DegreeClassification{
    id:number;
    name:string;
    abbreviation:string
}
export interface Degree{
    id:number;
    degreeName:string;
    code:string;
    requiredCredits:number
    degreeClassification:DegreeClassification,
    createdAt:string
}
export interface DegreeInfo{
    degreeProgressPercent:number;
        completedCredits:number;
        remainingCredits:number;
        requiredCredits:number;
        degreeName:string;
        degreeClassificationAbbreviation:string;
        enrollmentDate:string;
        expectedGraduationDate:string
}


const degreeApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
    createDegree: builder.mutation<Degree, CreateDegreeData>({
        query:(formData)=>({
            url:"/degree/create",
            method:"POST",
            body:formData
        }),
        invalidatesTags:["Degree"]
    }),
    getDegrees :builder.query<Degree[], void>({
        query:()=>({
            url:"/degree",
            method:"GET"
        }),
        providesTags:["Degree"]
    }),
    getDegreeClassifications:builder.query<DegreeClassification[], void>({
        query:()=>({
            url:"degree/degree-classification",
            method:"GET",
        }),
        providesTags:["DegreeClassification"]
    }),
    getStudentDegree:builder.query<DegreeInfo, void>({
        query:()=>({
            url:"/degree/student",
            method:"GET"
        })
    })

    })
})
//  /degree/degree-classification
export const {useCreateDegreeMutation, useGetDegreesQuery, useGetDegreeClassificationsQuery, useGetStudentDegreeQuery} = degreeApiSlice
export default degreeApiSlice.reducer