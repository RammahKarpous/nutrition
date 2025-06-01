<?php

use App\Models\Role;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    // Create the 'user' role needed for registration
    Role::create(['name' => 'user']);
    
    // Attempt to register a new user
    $response = $this->post('/register', [
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

    // Check that the response is a redirect to the dashboard
    $response->assertRedirect(route('dashboard', absolute: false));
});
