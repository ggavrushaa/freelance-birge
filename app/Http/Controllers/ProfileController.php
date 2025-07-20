<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\ProfileRepository;
use App\Services\ProfileService;
use App\Http\Requests\Profile\UpdateRequest;

class ProfileController extends Controller
{
    public function __construct(
        private ProfileRepository $repository,
        private ProfileService $service,
    ) {
    }

    public function show()
    {
        $profile = $this->repository->getProfileWithRelations(auth()->user());

        return Inertia::render('profile/show.page', [
            'profile' => $profile,
        ]);
    }

    public function edit()
    {
        $profile = $this->repository->getProfileWithRelations(auth()->user());

        return Inertia::render('profile/edit.page', [
            'profile' => $profile,
        ]);
    }       

    public function update(UpdateRequest $request)
    {
        $profile = $this->repository->getProfileWithRelations(auth()->user());

        $this->service->updateProfile($profile, $request->validated());

        return redirect()->route('profile.show');
    }

}
