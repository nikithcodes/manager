export function daysLeft(date) {
  const now = new Date();
  const due = new Date(date);
  const diffTime = due - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
