"use client"
import CreateDegreeForm from './CreateDegreeForm';
import DegreeList from './DegreeList';
import {useState} from "react"
const DegreePageContent = () => {
    const [refetchData, setRefetchData] = useState<boolean>(false)
  return (
   <div className="flex items-start gap-y-6 gap-x-7 flex-wrap md:flex-nowrap">
    <DegreeList refetchData={refetchData}/>
        <CreateDegreeForm setRefetchData={setRefetchData}/>
        
    </div>
  )
}

export default DegreePageContent