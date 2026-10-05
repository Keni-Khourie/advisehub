import PageHeader from '@/customUI/PageHeader';
import AdvisorDashboardContent from './AdvisorDashboardContent';

const AdvisorDashboard = () => {
  return (
    <div>
      <PageHeader headerText="Advisor Dashboard" subtitle="Today's work in one place"/>
      <AdvisorDashboardContent/>
    </div>
  )
}

export default AdvisorDashboard