"use client"
import DegreeProgressCard from "./DegreeProgressCard";
import RecommendedNextStepsCard from "./RecommendedNextStepsCard";
import WhatThisMeansCard from "./WhatThisMeansCard";
import {useGetStudentDegreeQuery} from "@/redux/features/main/degreeApiSlice"

const DegreeProgressContent = () => {
    
    const {data:degreeInfo, isLoading, isError} = useGetStudentDegreeQuery()
  return (
    <div className="w-full flex flex-col gap-y-8">
        <DegreeProgressCard 
        data={degreeInfo} isLoading={isLoading} isError={isError}
        />
        <div className="w-full flex gap-x-5">
          <WhatThisMeansCard data={degreeInfo} isLoading={isLoading} isError={isError} />
          <RecommendedNextStepsCard/>
        </div>
      </div>
  )
}

export default DegreeProgressContent