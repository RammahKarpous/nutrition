import { Product } from '@/types';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    products: Product[];
    setSelectedProducts: Dispatch<SetStateAction<Product[]>>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    className?: string;
}

export default function ProductsModal({ products, setSelectedProducts, className, setShowModal }: Props) {

    const [selectedProductsList, setSelectedProductsList] = useState([] as Product[]);

    return (
        <div className={`bg-background-alt absolute top-1/2 left-1/2 max-h-fit w-full max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-xl p-5 shadow-2xl ${className}`}>
            <div className="flex items-center justify-between">
                <h4 className="text-2xl">Select products</h4>
                <X className="cursor-pointer" onClick={() => setShowModal(false)} />
            </div>

            <div className="mt-5">
                {products.map((product) => (
                    <div key={product.id} className="border-background-alt flex items-center gap-2 border-b py-3">
                        <input 
                            type="checkbox" 
                            name="products" 
                            id={product.product_name} 
                            value={product.product_name} 
                            className="mr-3"
                            onChange={() => {
                                if (selectedProductsList.includes(product)) {
                                    setSelectedProductsList(selectedProductsList.filter((item) => item.id !== product.id))
                                } else {
                                    setSelectedProductsList([...selectedProductsList, product])
                                }
                                console.log(selectedProductsList);
                            }} />
                        <label htmlFor={product.product_name}>{product.product_name}</label>
                    </div>
                ))}

                <button 
                    className="mt-5 rounded-lg bg-orange-600 py-3 px-6 cursor-pointer" 
                    onClick={() => {
                        setSelectedProducts(selectedProductsList);
                        setShowModal(false);
                    }}>
                    Select
                </button>
            </div>
        </div>
    );
}
