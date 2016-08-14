<?php

namespace App\Http\Controllers;

use App\Models\Attendee;
use Illuminate\Http\Request;

class AttendeesController extends Controller
{
    public function getAllAttendees()
    {
        return Attendee::all();
    }

    public function createAttendee(Request $request)
    {
        $requestHasAllRequiredFields = $request->has(['name', 'surname', 'email', 'phoneNumber']);
        if (!$requestHasAllRequiredFields) {
            return response()->json(['message' => 'Brakujące wymagane pola'])->setStatusCode(400);
        }
        $attendeeAlreadyExists = Attendee::where('email', $request->get('email'))->orWhere('phoneNumber', $request->get('phoneNumber'))->exists();
        if ($attendeeAlreadyExists) {
            return response()->json(['message' => 'Email lub numer telefonu już wykorzystany.'])->setStatusCode(400);
        }
        return Attendee::create($request->all());
    }

    public function getAttendee(int $attendeeId)
    {
        $attendee = Attendee::findOrFail($attendeeId);
        return $attendee;
    }

    public function updateAttendee(Request $request, int $attendeeId)
    {
        $attendee = Attendee::findOrFail($attendeeId);
        return $attendee->update($request->all());
    }

    public function deleteAttendee(int $attendeeId)
    {
        $attendee = Attendee::findOrFail($attendeeId);
        return $attendee->delete();
    }
}
