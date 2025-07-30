<?php

namespace App\Http\Controllers;

use App\Services\RoleService;
use App\Http\Requests\Role\AssignRoleRequest;
use App\Http\Requests\Role\SwitchRoleRequest;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class RoleController extends Controller
{
    public function __construct(private RoleService $roleService)
    {
    }

    public function assignRole(AssignRoleRequest $request): JsonResponse
    {
        $user = User::findOrFail($request->user_id);
        $this->roleService->assignRole($user, $request->role_slug);

        return response()->json([
            'message' => 'Role assigned successfully',
            'user_role' => $this->roleService->getUserRole($user),
        ]);
    }

    public function getUserRole(): JsonResponse
    {
        $user = auth()->user();

        return response()->json([
            'role' => $this->roleService->getUserRole($user),
        ]);
    }

    public function switchRole(SwitchRoleRequest $request,$id): JsonResponse
    {
        $user = User::findOrFail($id);
        $roleSlug = $request->role_slug;

        if ($this->roleService->getUserRole($user) === $roleSlug) {
            return response()->json([
                'message' => "User is already a {$roleSlug}",
            ], 400);
        }

        $this->roleService->assignRole($user, $roleSlug);

        return response()->json([
            'message' => "Successfully switched to {$roleSlug} role",
            'user_role' => $this->roleService->getUserRole($user),
        ]);
    }
}