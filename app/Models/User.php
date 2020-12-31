<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use App\Models\UserRole;

class User extends Authenticatable
{
    use HasFactory, Notifiable;


    protected $fillable = [
        'name',
        'email',
        'password',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function ThisRole()
    {
        return ($this->UserRole()->first()->role_name);
    }

    public function isAdmin()
    {
        return ($this->UserRole()->first()->role_name == 'admin');
    }

    public function hasRole($role)
    {
        return ($this->UserRole()->first()->role_name == $role);
    }


    // RELATIONSHIP
    public function UserRole()
    {
        return $this->hasOne(UserRole::class, "id", 'role');
    }
}
