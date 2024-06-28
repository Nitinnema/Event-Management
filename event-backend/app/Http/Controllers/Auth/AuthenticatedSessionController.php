<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        // Retrieve the authenticated user
        $user = $request->user();
        if ($user) {
            // Generate a token for the authenticated user
            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'message' => 'User login successfully',
                'token' => $token,
                'user' => $user
            ], 200);
        }

        // Handle case where user authentication failed
        return response()->json([
            'message' => 'User not found or authentication failed'
        ], 404);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        return response()->noContent();
    }
}
