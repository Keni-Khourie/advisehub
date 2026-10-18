import {format, set} from "date-fns"
export const getDayPeriod = ()=>{
   const hour:number = parseInt(format(new Date(), "HH"),10)
   const morningStart = 4
   const afternoonStart = 12
   const eveningStart = 17
   const period = (morningStart<=hour && hour <afternoonStart)?"morning": (afternoonStart<=hour && hour <eveningStart)?"afternoon":"evening"
   return period
}

export const combineDateAndTime=( meetingDate:Date, meetingTime:string )=> {
  const [time, period] = meetingTime.split(" ");
  let hours = parseInt(time.split(":")[0])
  const minutes = parseInt(time.split(":")[1])
  
  //let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour time
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const dateTime = set(meetingDate, {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  });

  return dateTime.toISOString();
}
