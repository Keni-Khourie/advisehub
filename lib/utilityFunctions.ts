import {format} from "date-fns"
export const getDayPeriod = ()=>{
   const hour:number = parseInt(format(new Date(), "HH"),10)
   const morningStart = 4
   const afternoonStart = 12
   const eveningStart = 17
   const period = (morningStart<=hour && hour <afternoonStart)?"morning": (afternoonStart<=hour && hour <eveningStart)?"afternoon":"evening"
   return period
}