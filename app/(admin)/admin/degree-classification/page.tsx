import React from 'react'
import CreateDegreeClassificationForm from './CreateDegreeClassificationForm';
import DegreeSpecificationList from './DegreeSpecificationList';

const DegreeSpecificationPage = () => {
  return (
    <div className="flex items-start gap-y-6 flex-wrap md:flex-nowrap">
        <DegreeSpecificationList/>
        <CreateDegreeClassificationForm/>
    </div>
  )
}

export default DegreeSpecificationPage