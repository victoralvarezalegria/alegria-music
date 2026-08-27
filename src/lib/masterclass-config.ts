// Single source of truth for the masterclass date and join details, shared
// by the registration page and the confirmation page. `public/masterclass.ics`
// cannot import this (it's a static file downloaded as-is), so its
// DTSTART/DTEND must be kept in sync by hand — see MASTERCLASS_START_UTC below.
export const MASTERCLASS_IS_PLACEHOLDER = false;

// Display strings (date, day, time) live in translations.ts under the
// "masterclass" namespace, translated for every language the site supports.

// UTC, matches public/masterclass.ics DTSTART/DTEND. Helsinki is still EEST
// (UTC+3) in early September, so 7:00pm local is 16:00 UTC.
export const MASTERCLASS_START_UTC = "20260907T160000Z";
export const MASTERCLASS_END_UTC = "20260907T173000Z";

export const MASTERCLASS_ZOOM_URL =
  "https://us06web.zoom.us/j/83438053066?pwd=fcYPUlPcObJwURbDLo9Ku5wCHGlSKD.1";
export const MASTERCLASS_ZOOM_MEETING_ID = "834 3805 3066";
export const MASTERCLASS_ZOOM_PASSCODE = "171626";

export const MASTERCLASS_GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("The 1% Method Masterclass with Victor Alegria") +
  "&dates=" + `${MASTERCLASS_START_UTC}/${MASTERCLASS_END_UTC}` +
  "&details=" + encodeURIComponent(
    "Unlock range, confidence and audition-winning consistency with the 1% Method.\n\n" +
    "A live masterclass with Victor Alegria, Principal Trombone of the Helsinki Philharmonic.\n\n" +
    `Join on Zoom: ${MASTERCLASS_ZOOM_URL}\n` +
    `Meeting ID: ${MASTERCLASS_ZOOM_MEETING_ID}\n` +
    `Passcode: ${MASTERCLASS_ZOOM_PASSCODE}`
  );
