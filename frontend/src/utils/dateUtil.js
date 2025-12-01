export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return '';

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}