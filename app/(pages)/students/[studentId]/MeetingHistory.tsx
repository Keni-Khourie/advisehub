import {format} from "date-fns"

const MeetingHistory = () => {
    //data here should be sorted with the earliest being the first
    const meetings = ["2026-10-02", "2026-09-25", "2026-08-20", "2026-08-15", "2026-07-16"]
  return (
    <div className="flex flex-col gap-y-4 w-full">
        {meetings.map((meeting, index)=>(
            <div key={index} className="rounded-lg bg-white border pt-3 py-6 px-3 flex flex-col gap-y-2">
                <p className="font-semibold text-sm">{`${index===0?"Latest meeting":"Meeting"} • ${format(new Date(meeting), "MMM d, yyyy")}`}</p>
                <p className="font-thin text-sm text-ahTextGrey">{`Graduation requirements`}</p>

            </div>
        ))}

    </div>
  )
}

export default MeetingHistory