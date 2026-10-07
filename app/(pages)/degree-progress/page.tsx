import PageHeader from '@/customUI/PageHeader';
import DegreeProgressContent from './_components/DegreeProgressContent';

const DegreeProgressPage = () => {
  //fetch students degree progress
  return (
    <div className="w-full">
      <PageHeader headerText="Degree Progress" subtitle="Completed and Remaining Credits" additionalClass="mb-20"/>
      <DegreeProgressContent/>
    </div>
  )
}

export default DegreeProgressPage