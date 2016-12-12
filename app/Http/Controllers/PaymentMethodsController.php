<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\PaymentType;

class PaymentMethodsController extends Controller
{
  public function index()
  {
    // TODO: Replace with proper company fetching
    /** @var Company $company */
    $company = Company::query()->with('paymentTypes')->where('id', 1)->first();
    $types = $company->getAttribute('paymentTypes')->map(function(PaymentType $type){
      return [
        'id' => $type->getAttribute('id'),
        'name' => $type->getAttribute('name'),
        'internal_name' => $type->getAttribute('internal_name'),
        'deposit' => $type->getAttribute('pivot')->getAttribute('deposit'),
      ];
    });

    return response()->json($types);
  }
}
