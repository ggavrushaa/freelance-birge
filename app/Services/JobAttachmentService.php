<?php

namespace App\Services;
use Illuminate\Support\Facades\Storage;

class JobAttachmentService
{
    public function uploadPhoto($file)
    {
        $fileName = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('photos', $fileName, 'public');
        return '/storage/' . $path;
    }

    public function deletePhoto($path)
    {
        return Storage::disk('public')->delete($path);
    }
}
