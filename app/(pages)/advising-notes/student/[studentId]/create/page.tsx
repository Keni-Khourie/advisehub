import CreateAdvisingNoteContent from "./_components/CreateAdvisingNoteContent"
interface Props {
  params: Promise<{
    studentId: string;
  }>;
}
const CreateAdvisingNotesPage = async({params}:Props) => {
  const {studentId} = await params;
  return (
    <CreateAdvisingNoteContent studentId={parseInt(studentId)}/>
  )
}

export default CreateAdvisingNotesPage