<?php

use App\Models\Role;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    // Attempt to register a new user
    $response = $this->followingRedirects()->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Assert that the user is authenticated after the registration
    $this->assertAuthenticated();

    // Optionally, you can assert the user is added to the database
    $user = User::where('email', 'test@example.com')->first();
    expect($user)->not->toBeNull();

    // Optionally, check if the user was redirected to the correct page (like the dashboard)
    $response->assertRedirect(route('dashboard', absolute: false));
})->only();