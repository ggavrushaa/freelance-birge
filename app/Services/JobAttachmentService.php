<?php

namespace App\Services;
use Illuminate\Support\Facades\Storage;

class JobAttachmentService
{
    public function uploadPhoto($file)
    {
        return $file->store('jobs_photo', 'public');
    }

    public function deletePhoto($path)
    {
        return Storage::disk('public')->delete($path);
    }
}
