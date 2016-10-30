<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
  const STATUS_NEW = 0;
  const STATUS_PENDING = 1;
  const STATUS_PAID = 2;

  protected $fillable = [
    'attendee_id',
    'course_id',
    'payment_type_id',
  ];

  public $timestamps = false;

  public function course()
  {
    return $this->hasOne(Course::class, 'id', 'course_id');
  }

  public function attendee()
  {
    return $this->hasOne(Attendee::class, 'id', 'attendee_id');
  }

  public function paymentType()
  {
    return $this->hasOne(PaymentType::class, 'id', 'payment_type_id');
  }
}
