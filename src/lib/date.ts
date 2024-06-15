const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function fmtDate(dateString: string): string {
  const date = new Date(dateString);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function orderMonths(a: string, b: string) {
  return months.indexOf(a) - months.indexOf(b);
}