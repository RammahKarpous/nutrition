import { useEffect, useState } from 'react';
import { Product } from '@/types';

interface Props {
    product: Product;
    styles: { [key: string]: string };
    totalNutrition: {
        grams: number;
        kcal: number;
    };
    setTotalNutrition: React.Dispatch<React.SetStateAction<{
        grams: number;
        kcal: number;
    }>>;
}

const ProductsCalculatorTable = ({
    product,
    styles,
    totalNutrition,
    setTotalNutrition,
}: Props) => {
    const [grams, setGrams] = useState(1);

    useEffect(() => {
        setTotalNutrition((prevState) => ({
            grams: prevState.grams + grams,
            kcal: prevState.kcal + (product.kcal * grams),
        }));
    }, [totalNutrition]);

    const handleGramsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGrams(Number(event.target.value));
    };

    const getNutrition = (nutrition: number) => {
        return nutrition % 1 !== 0 ? (nutrition * grams).toFixed(2) : nutrition * grams;
    };

    return (
        <div key={product.id} className={styles.grid}>
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

