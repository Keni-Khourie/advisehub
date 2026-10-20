"use client";
import { useMemo, useState } from "react";
import {
  addDays,
  addWeeks,
  format,
  isBefore,
  isSameDay,
  isSameMinute,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { ChevronRight } from "lucide-react";

interface WeeklyAvailabilityProps {
  existingMeetings: string[];
  initialAvailability?: string[];
  onSave: (availability: string[]) => void | Promise<void>;
}

const TIME_SLOTS = [
  "9:00 AM",
  "10:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];

function createDateTime(date: Date, time: string): Date {
  const [clock, period] = time.split(" ");
  const [hours, minutes] = clock.split(":").map(Number);

  let hour = hours % 12;

  if (period === "PM") {
    hour += 12;
  }

  return setMinutes(setHours(date, hour), minutes);
}

export default function WeeklyAvailability({
  existingMeetings,
  initialAvailability = [],
  onSave,
}: WeeklyAvailabilityProps) {
  const [selectedDate, setSelectedDate] = useState(
    () => startOfDay(new Date())
  );

  const [availability, setAvailability] = useState<string[]>(
    initialAvailability
  );

  const [manualDate, setManualDate] = useState(
    () => format(new Date(), "yyyy-MM-dd")
  );

  const [manualTime, setManualTime] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const today = startOfDay(new Date());

  const weekStart = startOfWeek(selectedDate, {
    weekStartsOn: 1,
  });

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) =>
        addDays(weekStart, index)
      ),
    [weekStart]
  );

  const meetings = useMemo(
    () => existingMeetings.map(parseISO),
    [existingMeetings]
  );

  const selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(meeting, selectedDate)
  );

  const selectedDayAvailability = availability
    .map(parseISO)
    .filter((date) => isSameDay(date, selectedDate));

  function isPastDay(date: Date) {
    return isBefore(startOfDay(date), today);
  }

  function isSlotBooked(dateTime: Date) {
    return meetings.some((meeting) =>
      isSameMinute(meeting, dateTime)
    );
  }

  function isSlotSelected(dateTime: Date) {
    return availability.some(
      (item) => parseISO(item).getTime() === dateTime.getTime()
    );
  }

  function toggleTime(date: Date, time: string) {
    const dateTime = createDateTime(date, time);

    if (dateTime.getTime() <= Date.now()) return;
    if (isSlotBooked(dateTime)) return;

    const isoString = dateTime.toISOString();

    setAvailability((previous) =>
      previous.some(
        (item) => parseISO(item).getTime() === dateTime.getTime()
      )
        ? previous.filter(
            (item) => parseISO(item).getTime() !== dateTime.getTime()
          )
        : [...previous, isoString]
    );
  }

  function handleManualAdd() {
    if (!manualDate || !manualTime) return;

    // Use local noon to avoid date-only timezone shifting.
    const [year, month, day] = manualDate.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    if (isPastDay(date)) return;

    const dateTime = createDateTime(date, manualTime);

    if (dateTime.getTime() <= Date.now()) return;
    if (isSlotBooked(dateTime)) return;
    if (isSlotSelected(dateTime)) return;

    setAvailability((previous) => [
      ...previous,
      dateTime.toISOString(),
    ]);

    setSelectedDate(startOfDay(date));
    setManualTime("");
  }

  function goToNextWeek() {
    setSelectedDate((previous) => addWeeks(previous, 1));
  }

  async function handleSave() {
    setIsSaving(true);
    setSaveError(null);

    try {
      await onSave(availability);
    } catch {
      setSaveError("Unable to save availability. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F9FC] p-5 text-slate-900 sm:p-8">
      <header className="mb-8">
        <h1 className="text-xl font-bold">Manage Availability</h1>
        <p className="text-xs text-slate-500">
          Set times students can book without conflicts.
        </p>
      </header>

      {/* Weekly date selector */}
      <section className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            {isSameDay(
              weekStart,
              startOfWeek(today, { weekStartsOn: 1 })
            )
              ? "This week"
              : `${format(weekStart, "MMM d")} – ${format(
                  addDays(weekStart, 6),
                  "MMM d"
                )}`}
          </h2>

          <button
            type="button"
            onClick={goToNextWeek}
            aria-label="Next week"
            className="rounded-md p-2 text-slate-600 transition hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
          {weekDays.map((day) => {
            const selected = isSameDay(day, selectedDate);
            const disabled = isPastDay(day);

            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={disabled}
                aria-pressed={selected}
                onClick={() => setSelectedDate(day)}
                className={[
                  "rounded-md border px-3 py-3 text-xs font-medium transition-colors",
                  selected
                    ? "border-teal-400 bg-[#EFFBFA]"
                    : "border-slate-200 bg-white hover:border-teal-300",
                  disabled
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer",
                ].join(" ")}
              >
                {format(day, "EEE d")}
              </button>
            );
          })}
        </div>
      </section>

      {/* Available times and manual entry */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-sm font-semibold">
            Available times
          </h2>

          <div className="space-y-2">
            {TIME_SLOTS.map((time) => {
              const dateTime = createDateTime(selectedDate, time);
              const selected = isSlotSelected(dateTime);
              const booked = isSlotBooked(dateTime);
              const past = dateTime.getTime() <= Date.now();
              const disabled = booked || past;

              return (
                <button
                  key={time}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() => toggleTime(selectedDate, time)}
                  className={[
                    "flex w-full items-center justify-between rounded-md border px-3 py-2 text-xs transition-colors",
                    selected
                      ? "border-teal-400 bg-[#EFFBFA]"
                      : "border-slate-200 bg-white",
                    disabled && !selected
                      ? "cursor-not-allowed opacity-40"
                      : "hover:border-teal-300",
                  ].join(" ")}
                >
                  <span>{time}</span>

                  <span
                    className={[
                      "rounded-full px-4 py-1 text-[10px]",
                      selected
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-50 text-slate-500",
                    ].join(" ")}
                  >
                    {selected
                      ? "Selected"
                      : booked
                        ? "Booked"
                        : past
                          ? "Passed"
                          : "Available"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Existing meetings */}
          {selectedDayMeetings.length > 0 && (
            <div className="mt-5 rounded-md border border-slate-200 bg-white p-3">
              <h3 className="mb-2 text-xs font-semibold">
                Existing meetings
              </h3>

              {selectedDayMeetings.map((meeting) => (
                <p
                  key={meeting.toISOString()}
                  className="py-1 text-xs text-slate-600"
                >
                  {format(meeting, "h:mm a")}
                </p>
              ))}
            </div>
          )}

          {selectedDayAvailability.length > 0 && (
            <p className="mt-3 text-xs text-slate-500">
              {selectedDayAvailability.length} time slot(s) selected
            </p>
          )}
        </section>

        {/* Manual time entry */}
        <section className="h-fit rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-5 text-sm font-semibold">
            Add an available time
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-xs text-slate-500">
              Date
              <input
                type="date"
                value={manualDate}
                min={format(today, "yyyy-MM-dd")}
                onChange={(event) =>
                  setManualDate(event.target.value)
                }
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900"
              />
            </label>

            <label className="text-xs text-slate-500">
              Time
              <select
                value={manualTime}
                onChange={(event) =>
                  setManualTime(event.target.value)
                }
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900"
              >
                <option value="">Select a time</option>

                {TIME_SLOTS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleManualAdd}
              disabled={!manualDate || !manualTime}
              className="rounded-md border border-slate-200 px-5 py-2 text-xs font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Add Time
            </button>
          </div>
        </section>
      </div>

      {/* Save */}
      <div className="mt-12 flex flex-col items-end gap-3">
        {saveError && (
          <p role="alert" className="text-xs text-red-600">
            {saveError}
          </p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="min-w-44 rounded-md bg-[#4DB7A9] px-8 py-3 text-xs font-medium text-white transition hover:bg-[#3DA99B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Availability"}
        </button>
      </div>
    </main>
  );
}
