"use client"
import {useEffect} from 'react'
import {  useGetDegreesQuery } from "@/redux/features/main/degreeApiSlice";
import {generateArray} from "@/lib/utilityFunctions"
import { Skeleton } from '@/components/ui/skeleton';

interface Props{
  refetchData:boolean
}
const DegreeList = ({refetchData}:Props) => {
  const {data:degrees, isLoading, refetch} =useGetDegreesQuery()
  useEffect(()=>{
    if(refetchData)
    refetch()
  },[refetch, refetchData])

  return (
    <div className="md:w-1/2 w-full bg-white">
      {isLoading && generateArray(4).map((item, index)=><Skeleton key={index} className="h-8 w-full"/>)}
    {degrees && <div>
        {degrees.map((degree, index)=>(
          <div key={index}>{degree.degreeName}</div>
        ))}
      </div>}
    </div>
  )
}

export default DegreeList