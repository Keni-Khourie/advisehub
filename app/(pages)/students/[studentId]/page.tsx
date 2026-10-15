import StudentDetailsPageContent from "./StudentDetailsPageContent"

interface Props {
  params: Promise<{
    studentId: string;
  }>;
}

const StudentDetailsPage = async({ params }: Props) => {
    const { studentId } = await params;
  return (
    <StudentDetailsPageContent studentId={parseInt(studentId)}/>
  )
}

export default StudentDetailsPage