<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * add, creates, register new user
     * @return newly created user and plain text token
     */
    public function register(Request $request)
    {
        $this->validate($request,[
            'name'     => 'required|min:3|max:191',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6|max:10'
          ]);
 
          $user = new User;
          $user->name = $request->input('name');
          $user->email = $request->input('email');
          $user->password = Hash::make($request->input('password'));
          $user->save();
          $token = $user->createToken('access_token')->plainTextToken;
          return response()->json(['user' => $user,
             'token' => $token ], 201);
    }
    /**
     * logs the user in
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
    
        return $user->createToken($request->device_name)->plainTextToken;
    }
    /**
     * logs the user out and destroy the token
     */
    public function logout(Request $request)
    {
        Auth::user()->tokens()->delete();
        return response()->json(['message' => 'you are successfully logout'],200);
    }
}
