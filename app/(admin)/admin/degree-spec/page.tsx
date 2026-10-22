import React from 'react'
import CreateDegreeSpecificationForm from './CreateDegreeSpecificationForm';
import DegreeSpecificationList from './DegreeSpecificationList';

const DegreeSpecificationPage = () => {
  return (
    <div className="flex items-start gap-y-6 flex-wrap md:flex-nowrap">
        <DegreeSpecificationList/>
        <CreateDegreeSpecificationForm/>
    </div>
  )
}

export default DegreeSpecificationPage