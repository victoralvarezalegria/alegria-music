// Single source of truth for the masterclass date, shared by the registration
// page and the confirmation page. `public/masterclass.ics` cannot import this
// (it's a static file downloaded as-is), so its DTSTART/DTEND must be updated
// by hand to match whenever this changes — see MASTERCLASS_UTC_RANGE below.
//
// PLACEHOLDER: nothing is booked yet. Replace all fields together when the
// real date is confirmed, then delete the placeholder note on the confirmation
// page and set STATUS:CONFIRMED in public/masterclass.ics.
export const MASTERCLASS_IS_PLACEHOLDER = true;

export const MASTERCLASS_DATE_HEADING = "September 17th";
export const MASTERCLASS_DAY = "Thursday";
export const MASTERCLASS_TIME_EST = "7:00pm EST";
export const MASTERCLASS_TIME_PST = "4:00pm PST";

// UTC, matches public/masterclass.ics DTSTART/DTEND. September falls in EDT
// (UTC-4), so 7:00pm Eastern is 23:00 UTC the same day.
export const MASTERCLASS_START_UTC = "20260917T230000Z";
export const MASTERCLASS_END_UTC = "20260918T003000Z";

export const MASTERCLASS_GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("The 1% Method Masterclass with Victor Alegria") +
  "&dates=" + `${MASTERCLASS_START_UTC}/${MASTERCLASS_END_UTC}` +
  "&details=" + encodeURIComponent(
    "Unlock range, confidence and audition-winning consistency with the 1% Method.\n\n" +
    "A live masterclass with Victor Alegria, Principal Trombone of the Helsinki Philharmonic.\n\n" +
    "The join link arrives by email before the session."
  );
