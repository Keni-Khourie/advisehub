import AdvisingNoteContent from './AdvisingNoteContent';
interface Props {
  params: Promise<{
    noteId: string;
  }>;
}
const AdvisingNotePage = async ({ params }: Props) => {
    const { noteId } = await params;
  return (
    <AdvisingNoteContent noteId={parseInt(noteId)}/>
  )
}

export default AdvisingNotePage