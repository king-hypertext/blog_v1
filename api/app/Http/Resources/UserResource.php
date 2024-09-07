<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'fullname' => $this->firstname . ' ' . $this->lastname,
            'profile_picture' => $this->profile_picture ? URL::asset('images/users/' . $this->profile_picture) : 'N/A',
            'username' => $this->username,
            'role' => $this->role,
            'status' => $this->status,
            'email' => $this->email,
            'phone' => $this->phone_number,
            'bio' => $this->whenNotNull($this->bio),
            'email_verified_at' => $this->email_verified_at->toDateTimeString(),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            // 'posts' => PostResource::collection($this->posts),
        ];
    }
}
