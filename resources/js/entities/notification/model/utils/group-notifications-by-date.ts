import { Notification } from "../types";

export function groupNotificationsByDate(items: Notification[]) {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);
    const startOfLastWeek = new Date(startOfToday);
    startOfLastWeek.setDate(startOfToday.getDate() - 7);
    const groupedNotifications: { label: string; items: Notification[] }[] = [
        {
            label: 'Сегодня',
            items: [],
        },
        {
            label: 'Вчера',
            items: [],
        },
        {
            label: 'Прошлая неделя',
            items: [],
        },
    ];
    items.forEach((item) => {
        const date = new Date(item.created_at);
        if (date >= startOfToday) {
            groupedNotifications[0].items.push(item);
        } else if (date >= startOfYesterday) {
            groupedNotifications[1].items.push(item);
        } else if (date >= startOfLastWeek) {
            groupedNotifications[2].items.push(item);
        }
    });

    return groupedNotifications;
}