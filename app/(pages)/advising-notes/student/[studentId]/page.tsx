import StudentsAdvisingNotesContent from "./StudentsAdvisingNotesContent";

interface Props {
  params: Promise<{
    studentId: string;
  }>;
}
const StudentsAdvisingNotesPage = async ({params}:Props) => {
    const {studentId} = await params;
  return <StudentsAdvisingNotesContent studentId={parseInt(studentId)} />;
};

export default StudentsAdvisingNotesPage;
