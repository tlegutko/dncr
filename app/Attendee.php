<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendee extends Model
{
    protected $fillable = ['name', 'surname', 'email', 'phoneNumber'];
}
