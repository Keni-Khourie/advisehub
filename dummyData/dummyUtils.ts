
import { parseISO } from "date-fns";
import { ExistingMeetingData, DummyAdvisorAppointments } from "./dummyTypes";
import { dummyAdvisors, dummyStudentAdvisingNotes, existingMeetings, dummyAdvisorAppointments2 } from "./dummyData";

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

export const getAdvisorPastMeetings = (
  
): DummyAdvisorAppointments[] => {
  const currentTime = new Date();
  return dummyAdvisorAppointments2.filter(
    (meeting) => parseISO(meeting.appointmentDateTime) < currentTime
  );
};

export const getAdvisorUpcomingMeetings = (
  
): DummyAdvisorAppointments[] => {
  const currentTime = new Date();
  return dummyAdvisorAppointments2.filter(
    (meeting) => parseISO(meeting.appointmentDateTime) > currentTime
  );
};

export const getDummyAdvisorById = (advisorId:number)=>{
 const advisor = dummyAdvisors.find((advisor)=>advisor.id===advisorId)
 return advisor
}

export const getDummyStudentAdvisingNoteById = (id:number)=>{
return dummyStudentAdvisingNotes.find((note)=>note.id===id)
}