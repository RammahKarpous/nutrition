import ProductsCalculatorTable from '@/components/organisms/ProductsCalculatorTable';
import ProductsModal from '@/components/organisms/ProductsModal';
import AppLayout from '@/layouts/app-layout';
import { NutritionProvider, useNutrition } from '@/contexts/NutritionContext';

import { Product, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

// Create a CalculatorContent component that uses the context
const CalculatorContent = () => {
  const { products } = usePage().props as unknown as SharedData & { products: Product[] };
  const { totalNutrition, selectedProducts } = useNutrition();
  const [showModal, setShowModal] = useState(false);

  const styles: { [key: string]: string } = {
    headings: 'font-bold text-lg',
    grid: 'grid grid-cols-7 border-b border-background-alt',
    padding: 'px-5 py-3 ',
  };

  return (
    <AppLayout>
      <ProductsModal
        products={products}
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
          <p className={`${styles.headings} ${styles.padding}`}>
            {totalNutrition.fat.toFixed(2)}
          </p>
          <p className={`${styles.headings} ${styles.padding}`}>
            {totalNutrition.saturated_fat.toFixed(2)}
          </p>
          <p className={`${styles.headings} ${styles.padding}`}>
            {totalNutrition.carbs.toFixed(2)}
          </p>
          <p className={`${styles.headings} ${styles.padding}`}>
            {totalNutrition.protein.toFixed(2)}
          </p>
        </div>

        <button className="m-5 rounded-lg bg-orange-600 px-3 py-2 text-white hover:bg-orange-700" onClick={() => setShowModal(true)}>
          Select products
        </button>
      </div>
    </AppLayout>
  );
};

// Wrap the component with the NutritionProvider
export default function Calculator() {
  return (
    <NutritionProvider>
      <CalculatorContent />
    </NutritionProvider>
  );
}
