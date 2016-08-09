<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getAllUsers() {
        return response()->json(['status' => 'OK']);
    }

    public function createUser(Request $request) {
        return response()->json($request->all());
    }

    public function getUser(int $userId) {
        return $userId;
    }

    public function updateUser(Request $request, int $userId) {
        return $userId;
    }

    public function deleteUser(int $userId) {
        return $userId;
    }
}
