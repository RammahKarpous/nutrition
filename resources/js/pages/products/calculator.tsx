import ProductsCalculatorTable from '@/components/organisms/ProductsCalculatorTable';
import ProductsModal from '@/components/organisms/ProductsModal';
import AppLayout from '@/layouts/app-layout';

import { Product, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Calculator() {
    const { products } = usePage().props as unknown as SharedData & { products: Product[] };

    const [selectedProducts, setSelectedProduct] = useState([] as Product[]);
    const [showModal, setShowModal] = useState(false);
    const [totalNutrition, setTotalNutrition] = useState({
        grams: 0,
        kcal: 0,
    });

    //  fat: 0, saturated_fat: 0, carbs: 0, protein: 0
    const styles: { [key: string]: string } = {
        headings: 'font-bold text-lg',
        grid: 'grid grid-cols-7 border-b border-background-alt',
        padding: 'px-5 py-3 ',
    };

    return (
        <AppLayout>
            <ProductsModal
                products={products}
                setSelectedProducts={setSelectedProduct}
                setShowModal={setShowModal}
                className={`transition-all ${showModal ? 'pointer-events-auto mt-0 opacity-100' : 'pointer-events-none mt-5 opacity-0'}`}
            />

            <div className="mx-auto w-full max-w-7xl p-5">
                <h1 className="text-3xl font-bold">Calculator</h1>

                <div className={`${styles.grid}`}>
                    <p className={`${styles.headings} ${styles.padding}`}>Product name</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Grams</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Kcal</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Fat</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Saturated fat</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Carbs</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Protein</p>
                </div>

                {selectedProducts.map((product) => (
                    <ProductsCalculatorTable
                        totalNutrition={totalNutrition}
                        setTotalNutrition={setTotalNutrition}
                        key={product.id}
                        product={product}
                        styles={styles}
                    />
                ))}

                <div className={`${styles.grid}`}>
                    <p className={`${styles.headings} ${styles.padding}`}>Total</p>
                    <p className={`${styles.headings} ${styles.padding}`}>{totalNutrition.grams}</p>

                    <p className={`${styles.headings} ${styles.padding}`}>
                        {totalNutrition.kcal.toFixed(2)}
                    </p>
                    <p className={`${styles.headings} ${styles.padding}`}>-</p>
                    <p className={`${styles.headings} ${styles.padding}`}>-</p>
                    <p className={`${styles.headings} ${styles.padding}`}>-</p>
                    <p className={`${styles.headings} ${styles.padding}`}>-</p>
                </div>

                <button className="m-5 rounded-lg bg-orange-600 px-3 py-2 text-white hover:bg-orange-700" onClick={() => setShowModal(true)}>
                    Select products
                </button>
            </div>
        </AppLayout>
    );
}
