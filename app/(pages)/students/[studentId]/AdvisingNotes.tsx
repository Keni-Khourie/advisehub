import {format} from "date-fns"

const AdvisingNotes = () => {
    //data here should be sorted from earliest to farthest
    const notes = ["Reviewed graduation requirements. Student should complete capstone for next year.", "Assessed career prospects upon graduation.", "Discussed courses to complete credits required for the degree"]
  return (
    <div className="flex flex-col gap-y-4 w-full">
        {notes.map((note, index)=>(
            <div key={index} className="rounded-lg bg-white border pt-3 py-6 px-3 flex flex-col gap-y-2">
                <p className="font-semibold text-sm">{`${index===0?"Latest note":"Note"} • ${format(new Date(), "MMM d, yyyy")}`}</p>
                <p className="font-thin text-sm text-ahTextGrey">{note}</p>

            </div>
        ))}

    </div>
  )
}

export default AdvisingNotes