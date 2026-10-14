
import { parseISO } from "date-fns";
import { ExistingMeetingData } from "./dummyTypes";
import { dummyAdvisors, existingMeetings } from "./dummyData";

export const getPastMeetings = (
  
): ExistingMeetingData[] => {
  const currentTime = new Date();
  return existingMeetings.filter(
    (meeting) => parseISO(meeting.endDateTime) < currentTime
  );
};

export const getUpcomingMeetings = (
  
): ExistingMeetingData[] => {
  const currentTime = new Date();
  return existingMeetings.filter(
    (meeting) => parseISO(meeting.endDateTime) > currentTime
  );
};

export const getDummyAdvisorById = (advisorId:number)=>{
 const advisor = dummyAdvisors.find((advisor)=>advisor.id===advisorId)
 return advisor
}