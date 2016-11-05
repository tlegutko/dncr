<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Payment extends Model
{
  const STATUS_NEW = 0;
  const STATUS_PENDING = 1;
  const STATUS_PAID = 2;

  protected $fillable = [
    'attendee_id',
    'course_id',
    'payment_type_id',
    'amount'
  ];

  public $timestamps = false;

  public function course(): HasOne
  {
    return $this->hasOne(Course::class, 'id', 'course_id');
  }

  public function attendee(): HasOne
  {
    return $this->hasOne(Attendee::class, 'id', 'attendee_id');
  }

  public function paymentType(): HasOne
  {
    return $this->hasOne(PaymentType::class, 'id', 'payment_type_id');
  }
}
