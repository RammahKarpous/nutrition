<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get( '/', function () {
    return Inertia::render( 'welcome' );
} )->name( 'home' );

Route::middleware( ['auth', 'verified'] )->group( function () {
    Route::get( 'dashboard', function () {
        return Inertia::render( 'dashboard' );
    } )->name( 'dashboard' );

    /**
     * Product routes
     *
     * @action get all products
     * @action add product
     * @action delete product
     * @action update product
     */
    Route::get( 'add-product', [ProductController::class, 'index'] )->name( 'product.index' );
    Route::post( 'add-product', [ProductController::class, 'create'] )->name( 'product.create' );
    Route::delete( 'delete-product/{id}', [ProductController::class, 'delete'] )->name( 'product.delete' );
    Route::patch( 'update-product/{id}', [ProductController::class, 'update'] )->name( 'product.update' );

    Route::get('calculator', [ProductController::class,'calculator'])->name('product.calculator');
} );

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
