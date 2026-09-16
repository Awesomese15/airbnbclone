export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function sameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
}

export function dayKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isBeforeDay(a, b) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a, b) {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function isBetweenDays(date, start, end) {
  if (!start || !end) return false;
  const t = startOfDay(date).getTime();
  const lo = startOfDay(start).getTime();
  const hi = startOfDay(end).getTime();
  return t > lo && t < hi;
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const ms = startOfDay(checkOut).getTime() - startOfDay(checkIn).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function formatDisplayDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatShortBookingDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function monthLabel(date) {
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export function addMonths(date, count) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const leading = first.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < leading; i += 1) cells.push(null);
  for (let day = 1; day <= totalDays; day += 1) {
    cells.push(new Date(year, month, day));
  }
  return cells;
}
