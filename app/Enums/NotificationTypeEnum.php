<?php

namespace App\Enums;

enum NotificationTypeEnum: string
{
    case WELCOME = 'welcome';
    case JOB_CREATED = 'job_created';
    case JOB_UPDATED = 'job_updated';
    case GIG_CREATED = 'gig_created';
    case GIG_UPDATED = 'gig_updated';
    case APPLICATION_RECEIVED = 'application_received';
    case APPLICATION_ACCEPTED = 'application_accepted';
    case APPLICATION_REJECTED = 'application_rejected';
    case PAYMENT_RECEIVED = 'payment_received';
    case PAYMENT_SENT = 'payment_sent';
    case SYSTEM = 'system';
    case INFO = 'info';
    case SUCCESS = 'success';
    case WARNING = 'warning';
    case ERROR = 'error';

    public function label(): string
    {
        return match ($this) {
            self::WELCOME => 'Добро пожаловать',
            self::JOB_CREATED => 'Работа создана',
            self::JOB_UPDATED => 'Работа обновлена',
            self::GIG_CREATED => 'Услуга создана',
            self::GIG_UPDATED => 'Услуга обновлена',
            self::APPLICATION_RECEIVED => 'Получена заявка',
            self::APPLICATION_ACCEPTED => 'Заявка принята',
            self::APPLICATION_REJECTED => 'Заявка отклонена',
            self::PAYMENT_RECEIVED => 'Платеж получен',
            self::PAYMENT_SENT => 'Платеж отправлен',
            self::SYSTEM => 'Система',
            self::INFO => 'Информация',
            self::SUCCESS => 'Успех',
            self::WARNING => 'Предупреждение',
            self::ERROR => 'Ошибка',
        };
    }

    public function icon(): string
    {
        return match ($this) {
            self::WELCOME => '🎉',
            self::JOB_CREATED, self::GIG_CREATED => '✅',
            self::JOB_UPDATED, self::GIG_UPDATED => '🔄',
            self::APPLICATION_RECEIVED => '📨',
            self::APPLICATION_ACCEPTED => '✅',
            self::APPLICATION_REJECTED => '❌',
            self::PAYMENT_RECEIVED, self::PAYMENT_SENT => '💰',
            self::SYSTEM => '⚙️',
            self::INFO => 'ℹ️',
            self::SUCCESS => '✅',
            self::WARNING => '⚠️',
            self::ERROR => '❌',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::WELCOME, self::SUCCESS, self::APPLICATION_ACCEPTED => 'green',
            self::JOB_CREATED, self::GIG_CREATED, self::PAYMENT_RECEIVED, self::PAYMENT_SENT => 'blue',
            self::JOB_UPDATED, self::GIG_UPDATED, self::APPLICATION_RECEIVED => 'yellow',
            self::APPLICATION_REJECTED, self::ERROR => 'red',
            self::WARNING => 'orange',
            self::SYSTEM, self::INFO => 'gray',
        };
    }
}