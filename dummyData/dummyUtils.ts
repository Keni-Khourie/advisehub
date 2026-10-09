
import { parseISO } from "date-fns";
import { ExistingMeetingData } from "./dummyTypes";

export const getPastMeetings = (
  meetings: ExistingMeetingData[]
): ExistingMeetingData[] => {
  const currentTime = new Date();

  return meetings.filter(
    (meeting) => parseISO(meeting.endDateTime) < currentTime
  );
};

export const getUpcomingMeetings = (
  meetings: ExistingMeetingData[]
): ExistingMeetingData[] => {
  const currentTime = new Date();

  return meetings.filter(
    (meeting) => parseISO(meeting.endDateTime) > currentTime
  );
};