"use client"
import DegreeProgressCard from "./DegreeProgressCard";
import RecommendedNextStepsCard from "./RecommendedNextStepsCard";
import WhatThisMeansCard from "./WhatThisMeansCard";

const DegreeProgressContent = () => {
    //fetch students Degree info. This info should contain required credits
    const dummyDegreeInfo = {
        creditsEarned :94,
        creditsRemaining:26,
        degreeCompletion:78
    }
  return (
    <div className="w-full flex flex-col gap-y-8">
        <DegreeProgressCard completedCredits={dummyDegreeInfo.creditsEarned} remainingCredits={dummyDegreeInfo.creditsRemaining} percentComplete={dummyDegreeInfo.degreeCompletion}/>
        <div className="w-full flex gap-x-5">
          <WhatThisMeansCard completedCredits={dummyDegreeInfo.creditsEarned} remainingCredits={dummyDegreeInfo.creditsRemaining}/>
          <RecommendedNextStepsCard/>
        </div>
      </div>
  )
}

export default DegreeProgressContent