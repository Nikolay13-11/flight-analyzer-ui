export function getDatesInRange(end: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date();

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function createDisabledDates(allowedDates: string[]) {
  const allDates = getDatesInRange(new Date(allowedDates.at(-1) ?? ''));

  return allDates.filter((date) =>
    allowedDates.includes(date.toISOString().split('T')[0])
  );
}
