<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function __construct(
        private NotificationService $notificationService
    ) {
    }

    public function index(Request $request)
    {
        $user = auth()->user();
        $notifications = $this->notificationService->getUnreadNotifications($user, 20);

        return Inertia::render('notifications/index.page', [
            'notifications' => $notifications,
            'unread_count' => $this->notificationService->getUnreadCount($user),
        ]);
    }

    public function unread(Request $request)
    {
        $user = auth()->user();
        $notifications = $this->notificationService->getUnreadNotifications($user, 20);

        return Inertia::render('notifications/unread.page', [
            'notifications' => $notifications,
            'unread_count' => $notifications->count(),
        ]);
    }

    public function markAsRead(Notification $notification)
    {
        $this->notificationService->markAsRead($notification);

        return Inertia::render('notifications/mark-as-read.page', [
            'message' => 'Уведомление помечено как прочитанное',
        ]);
    }

    public function markAllAsRead(Request $request)
    {
        $user = auth()->user();
        $this->notificationService->markAllAsRead($user);
        $notifications = $this->notificationService->getUnreadNotifications($user, 20);
        return Inertia::render('notifications/index.page', [
            'notifications' => $notifications,
            'unread_count' => $this->notificationService->getUnreadCount($user),
        ]);
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();

        return Inertia::render('notifications/destroy.page', [
            'message' => 'Уведомление удалено',
        ]);
    }
}