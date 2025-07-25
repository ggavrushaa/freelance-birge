<?php

namespace App\Http\Controllers;

use App\Enums\LanguageEnum;
use App\Enums\SkillEnum;
use App\Models\Language;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\ProfileRepository;
use App\Services\ProfileService;
use App\Http\Requests\Profile\UpdateRequest;
use App\Services\JobAttachmentService;
use App\Http\Requests\Profile\StoreRequest;

class ProfileController extends Controller
{
    public function __construct(
        private ProfileRepository $repository,
        private ProfileService $service,
        private JobAttachmentService $attachmentService,
    ) {
    }

    public function index()
    {
        $profile = $this->repository->getProfileWithRelations(auth()->user());
        return Inertia::render('profile/index.page', [
            'profile' => $profile,
        ]);
    }

    public function show()
    {
        $profile = $this->repository->getProfileWithRelations(auth()->user());

        return Inertia::render('profile/show.page', [
            'profile' => $profile,
        ]);
    }

    public function create()
    {
        return Inertia::render('profile/create.page', [
            "languages" => Language::all(),
            "skills" => Skill::all(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $this->attachmentService->uploadPhoto(
                $request->file('avatar')
            );
        }

        $this->service->create($data);
        return redirect()->route('profile.show', ['profile' => $this->repository->getProfileWithRelations(auth()->user())]);
    }

    public function edit()
    {
        $profile = $this->repository->getProfileWithRelations(auth()->user());

        return Inertia::render('profile/edit.page', [
            'profile' => $profile,
            "allLanguages" => Language::all(),
            "allSkills" => Skill::all(),
        ]);
    }

    public function update(UpdateRequest $request)
    {
        $profile = $this->repository->getProfileWithRelations(auth()->user());

        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $this->attachmentService->uploadPhoto(
                $request->file('avatar')
            );
        }
        $this->service->update($profile, $data);

        return redirect()->route('profile.show', ['profile' => $this->repository->getProfileWithRelations(auth()->user())]);
    }

}
