<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function validate($data) {
        return $data->validate([
            'user_id' => ['required'],
            'product_name' => ['string', 'required'],
            'kcal' => ['numeric', 'min:0', 'required'],
            'fat' => ['numeric', 'min:0', 'required'],
            'saturated_fat' => ['numeric', 'min:0', 'required'],
            'carbs' => ['numeric', 'min:0', 'required'],
            'protein' => ['numeric', 'min:0', 'required'],
        ]);
    }

    public function index() {
        $user = auth()->user();

        return inertia('products/add-product', [
            'products' => Product::where('user_id', $user->id)->get(),
        ]);
    }

    public function create(Request $request) {        
        $validation = $this->validate($request);
        Product::create($validation);

        return redirect()->route('product.index')->with('success','Product added!');
    }

    public function delete($id) {
        Product::destroy($id);
    }

    public function update(Request $request, $id) {
        $validation = $this->validate($request);
        Product::find($id)->update($validation);

        return redirect()->route('product.index')->with('success','Product updated!');
    }

    public function calculator() {
        $user = auth()->user();

        return inertia('products/calculator', [
            'products' => Product::where('user_id', $user->id)->get(),
        ]);
    }
}
