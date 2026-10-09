
import { parseISO } from "date-fns";
import { ExistingMeetingData } from "./dummyTypes";
import { existingMeetings } from "./dummyData";

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