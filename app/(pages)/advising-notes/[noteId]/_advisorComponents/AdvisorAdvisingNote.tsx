interface Props{
    noteId:number
}

const AdvisorAdvisingNote = ({noteId}:Props) => {
  return (
    <div>
        <p>AdvisorAdvisingNote</p>
        <p>{`Note ID: ${noteId}`}</p>
    </div>
  )
}

export default AdvisorAdvisingNote