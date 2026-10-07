"use client"

import DegreeCreditsCard from "./DegreeCreditsCard";
import DegreeProgressCard from "./DegreeProgressCard";

const DegreeProgressContent = () => {
    //fetch students Degree info
    const dummyDegreeInfo = {
        creditsEarned :94,
        creditsRemaining:26,
        degreeCompletion:78
    }
  return (
    <div className="w-full flex flex-col gap-y-8">
        <DegreeProgressCard completedCredits={dummyDegreeInfo.creditsEarned} remainingCredits={dummyDegreeInfo.creditsRemaining} percentComplete={dummyDegreeInfo.degreeCompletion}/>
        <div className="w-full flex gap-x-5">
          <DegreeCreditsCard title="Completed" subtitle="Credits already earned" credits={dummyDegreeInfo.creditsEarned}/>
          <DegreeCreditsCard title="Remaining" subtitle="Credits still needed" credits={dummyDegreeInfo.creditsRemaining}/>
        </div>
      </div>
  )
}

export default DegreeProgressContent