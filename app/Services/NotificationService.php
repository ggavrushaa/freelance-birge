<?php

namespace App\Services;

use App\Enums\NotificationTypeEnum;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;

class NotificationService
{
    public function createNotification(
        User $user,
        NotificationTypeEnum $type,
        string $title,
        string $description,
        array $data = [],
        ?Carbon $expiresAt = null
    ): Notification {
        return Notification::create([
            'user_id' => $user->id,
            'type' => $type,
            'title' => $title,
            'description' => $description,
            'data' => $data,
            'expires_at' => $expiresAt,
        ]);
    }

    public function createWelcomeNotification(User $user): Notification
    {
        $role = $user->role;
        $title = 'Добро пожаловать!';
        $description = $role === 'customer'
            ? 'Рады видеть вас в нашей системе! Теперь вы можете создавать заказы и находить исполнителей.'
            : 'Рады видеть вас в нашей системе! Теперь вы можете предлагать услуги и находить заказы.';

        return $this->createNotification(
            user: $user,
            type: NotificationTypeEnum::WELCOME,
            title: $title,
            description: $description,
            data: ['role' => $role],
            expiresAt: now()->addDays(7) 
        );
    }

    public function getUserNotifications(User $user, int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return $user->notifications()
            ->notExpired()
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getUnreadNotifications(User $user, int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return $user->notifications()
            ->unread()
            ->notExpired()
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function markAsRead(Notification $notification): void
    {
        $notification->markAsRead();
    }

    public function markAllAsRead(User $user): int
    {
        return $user->notifications()
            ->unread()
            ->update(['read_at' => now()]);
    }

    public function deleteExpiredNotifications(): int
    {
        return Notification::where('expires_at', '<', now())->delete();
    }

    public function getUnreadCount(User $user): int
    {
        return $user->notifications()
            ->unread()
            ->notExpired()
            ->count();
    }
}