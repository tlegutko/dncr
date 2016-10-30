<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyPaymentType extends Model
{
  protected $fillable = [
    'company_id',
    'payment_type_id',
    'deposit',
  ];

  public $timestamps = false;

  public function company()
  {
    return $this->hasOne(Company::class, 'id', 'company_id');
  }

  public function paymentType()
  {
    return $this->hasOne(PaymentType::class, 'id', 'payment_type_id');
  }
}
