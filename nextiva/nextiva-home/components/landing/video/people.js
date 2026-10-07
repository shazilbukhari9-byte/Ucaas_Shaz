/* Sample attendees used across the Video Meetings mockups. Initials map to
   the name shown in the avatar's hover card. Sample names only. */
export const PEOPLE_NAMES = {
  TW: 'Tara W.',
  DO: 'Daniel O.',
  PS: 'Priya S.',
  MK: 'Marcus K.',
  AN: 'Aisha N.',
  YO: 'You',
  SR: 'Sarah Ruiz',
};

export const nameOf = (n) => PEOPLE_NAMES[n] || n;
