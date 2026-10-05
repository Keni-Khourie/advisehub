import PageHeader from '@/customUI/PageHeader';
import React from 'react'
import StudentDashboard from './_studentComponents/StudentDashboard';
import AdvisorDashboard from './_advisorComponents/AdvisorDashboard';

const DashboardPage = () => {

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
const user:any = {
    role:"STUDENT"
}

  return (
    <div>
      {user.role==="STUDENT"?(<StudentDashboard/>):user.role==="ADVISOR"?(<AdvisorDashboard/>):<></>}
    </div>
  )
}

export default DashboardPage