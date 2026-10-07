import PageHeader from '@/customUI/PageHeader';
import StudentDashboardContent from './StudentDashboardContent';


const StudentDashboard = () => {
  return (
    <div>
     <PageHeader headerText="Student Dashboard" subtitle="Choose what you need today" additionalClass=""/>
     <StudentDashboardContent/>
    </div>
  )
}

export default StudentDashboard