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
    })
    })
})
//  /degree/degree-classification
export const {useCreateDegreeMutation, useGetDegreesQuery, useGetDegreeClassificationsQuery} = degreeApiSlice
export default degreeApiSlice.reducer