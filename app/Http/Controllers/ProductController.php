<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function validate($data) {
        return $data->validate([
            'product_name' => 'string|required',
            'kcal' => 'float|min:0|required',
            'fat' => 'float|min:0|required',
            'saturated_fat' => 'float|min:0|required',
            'carbs' => 'float|min:0|required',
            'protein' => 'float|min:0|required',
        ]);
    }

    public function index() {
        return inertia('products/add-product', [
            'products' => Product::all()
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
}
