import React from 'react'
interface Props{
    noteId:number
}
const StudentAdvisingNote = ({noteId}:Props) => {
  return (
    <div>
        <p>StudentAdvisingNote</p>
        <p>{`Note ID: ${noteId}`}</p>
    </div>
  )
}

export default StudentAdvisingNote