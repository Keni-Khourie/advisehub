import PageHeader from '@/customUI/PageHeader';
import DegreeProgressContent from './_components/DegreeProgressContent';

const DegreeProgressPage = () => {
  //fetch students degree progress
  return (
    <div className="w-full">
      <PageHeader headerText="Degree Progress" subtitle="A clear overview of the credits recorded in your student record." additionalClass=""/>
      <DegreeProgressContent/>
    </div>
  )
}

export default DegreeProgressPage