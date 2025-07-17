<?php

namespace App\Enums;

enum OrderStatusEnum: string
{
    case CREATED = 'Заказ создан';
    case PENDING = 'Ожидание подтверждения';
    case PAID_PENDING = 'Ожидание оплаты';
    case IN_PROGRESS = 'В работе';
    case EXPIRED = 'Истек срок сдачи';
    case COMPLETED = 'Работа сдана';
    case COMPLETED_CONFIRMED = 'Подтверждения сдачи';
    case REWORK = 'Доработка';
    case FINISHED = 'Завершена';
    case CANCELLED = 'Отмена';
    case DISPUTE = 'Спор';
    case DISPUTE_RESOLVED = 'Решение по спору';

    public function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
