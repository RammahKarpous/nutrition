import { useNutrition } from '@/contexts/NutritionContext';
import { Product } from '@/types';

interface Props {
  product: Product & { currentGrams?: number };
  styles: { [key: string]: string };
}

const ProductsCalculatorTable = ({ product, styles }: Props) => {
  const { updateProductGrams } = useNutrition();
  
  // Use currentGrams from the context-enhanced product
  const grams = product.currentGrams || 1;

  const handleGramsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateProductGrams(product.id, Number(event.target.value));
  };

  const getNutrition = (nutrition: number) => {
    return nutrition % 1 !== 0 ? (nutrition * grams / 100).toFixed(2) : nutrition * grams / 100;
  };

  return (
    <div className={styles.grid}>
      <p className={styles.padding}>{product.product_name}</p>
      <input
        type="number"
        min={1}
        value={grams}
        className={`${styles.padding} m-1 rounded-lg bg-white text-black`}
        onChange={handleGramsChange}
      />
      <p className={styles.padding}>{getNutrition(product.kcal)}</p>
      <p className={styles.padding}>{getNutrition(product.fat)}</p>
      <p className={styles.padding}>{getNutrition(product.saturated_fat)}</p>
      <p className={styles.padding}>{getNutrition(product.carbs)}</p>
      <p className={styles.padding}>{getNutrition(product.protein)}</p>
    </div>
  );
};

export default ProductsCalculatorTable;

