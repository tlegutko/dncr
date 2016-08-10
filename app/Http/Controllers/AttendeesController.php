<?php

namespace App\Http\Controllers;

use App\Attendee;
use Log;
use Illuminate\Http\Request;

class AttendeesController extends Controller
{
    public function getAllAttendees()
    {
        return response()->json(['status' => 'OK']);
    }

    public function createAttendee(Request $request)
    {
        try {
            return Attendee::create($request->all());
        } catch (\PDOException $e) { // TODO: more detailed error handling
            Log::error("DB exception when creating attendee: {$e->getMessage()}");
            return response()->json('Email or phone number already in use')->setStatusCode(400);
        }
    }

    public function getAttendee(int $attendeeId)
    {
        return $attendeeId;
    }

    public function updateAttendee(Request $request, int $attendeeId)
    {
        return $attendeeId;
    }

    public function deleteAttendee(int $attendeeId)
    {
        return $attendeeId;
    }
}
