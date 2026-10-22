import React from 'react'
import CreateDegreeForm from './CreateDegreeForm';
import DegreeList from './DegreeList';

const AdminDegreePage = () => {
  return (
    <div className="flex items-start gap-y-6 flex-wrap md:flex-nowrap">
        <CreateDegreeForm/>
        <DegreeList/>
    </div>
  )
}

export default AdminDegreePage