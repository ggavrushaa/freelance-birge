export function formatNotificationDate(input: string): string {
  const date = new Date(input);
  const now = new Date();
  
  const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  const time = date.toLocaleTimeString('ru-RU', optionsTime);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) {
    return `Сегодня, ${time}`;
  }

  if (isSameDay(date, yesterday)) {
    return `Вчера, ${time}`;
  }

  // Если дата старше, показываем день и месяц
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long'
  };
  const dateStr = date.toLocaleDateString('ru-RU', optionsDate);

  return `${dateStr}, ${time}`;
}