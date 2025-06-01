import { Product } from '@/types';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useNutrition } from '@/contexts/NutritionContext';

interface Props {
  products: Product[];
  setShowModal: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function ProductsModal({ products, className, setShowModal }: Props) {
  const { addProduct, clearProducts, selectedProducts } = useNutrition();
  const [selectedProductsList, setSelectedProductsList] = useState([] as Product[]);

  // Initialize selected products list from context when opening modal
  useEffect(() => {
    setSelectedProductsList(
      products.filter(product => 
        selectedProducts.some(selected => selected.id === product.id)
      )
    );
  }, [selectedProducts, products]);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setShowModal(false);
    }
  });

  return (
    <div className={`bg-background-alt absolute top-1/2 left-1/2 max-h-fit w-full max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-hidden rounded-xl p-5 shadow-2xl ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-2xl">Select products</h4>
        <X className="cursor-pointer" onClick={() => setShowModal(false)} />
      </div>

      <div className="mt-5">
        <div className='max-h-[500px] overflow-y-auto'>
          {products.map((product) => (
            <div key={product.id} className="border-background-alt flex items-center gap-2 border-b py-1">
              <input 
                type="checkbox" 
                name="products" 
                id={product.product_name} 
                value={product.product_name} 
                className="mr-3 absolute opacity-0 peer"
                checked={selectedProductsList.some(item => item.id === product.id)}
                onChange={() => {
                  if (selectedProductsList.some(item => item.id === product.id)) {
                    setSelectedProductsList(selectedProductsList.filter((item) => item.id !== product.id))
                  } else {
                    setSelectedProductsList([...selectedProductsList, product])
                  }
                }} />
              <label 
                htmlFor={product.product_name} 
                className='peer-checked:bg-background/25 bg-background/10 peer-checked:text-white p-5 w-full rounded-lg cursor-pointer border border-background/50'>
                
                {product.product_name}
              </label>
            </div>
          ))}
        </div>

        <button 
          className="mt-5 rounded-lg bg-orange-600 py-3 px-6 cursor-pointer" 
          onClick={() => {
            // Clear existing products first
            clearProducts();
            
            // Add all selected products
            selectedProductsList.forEach(product => {
              addProduct(product);
            });
            
            setShowModal(false);
          }}>
          Select
        </button>
      </div>
    </div>
  );
}
