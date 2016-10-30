<?php

namespace App\Http\Controllers;

use App\Models\CompanyPaymentType;
use App\Models\PaymentType;
use Illuminate\Database\Query\Builder;

class PaymentMethodsController extends Controller
{
  public function index()
  {
    // TODO: Replace with proper company fetching
    /** @var Builder $query */
    $query = CompanyPaymentType::with('paymentType')->where('company_id', 1);
    $types = $query->get()->map(function(CompanyPaymentType $type){
      /** @var PaymentType $payment */
      $payment = $type->getAttribute('paymentType');

      return [
        'id' => $payment->getAttribute('id'),
        'name' => $payment->getAttribute('name'),
        'internal_name' => $payment->getAttribute('internal_name'),
        'deposit' => $type->getAttribute('deposit'),
      ];
    });

    return response()->json($types);
  }
}
