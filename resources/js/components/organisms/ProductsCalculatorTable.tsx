import { Product } from '@/types';
import { useState } from 'react';

interface Props {
    product: Product;
    styles: { [key: string]: string };
}

export default function ProductsCalculatorTable({ product, styles }: Props) {
    const [grams, setGrams] = useState(1);

    const hasDecimalPoint = (nutrition: number) => {
        return nutrition % 1 !== 0 ? (nutrition * grams).toFixed(2) : nutrition * grams;
    };

    return (
        <div key={product.id} className={`${styles.grid}`}>
            <p className={styles.padding}>{product.product_name}</p>
            <input
                type="number"
                value={grams}
                className={`m-1 rounded-lg bg-white text-black ${styles.padding}`}
                onChange={(e) => setGrams(Number(e.target.value))}
            />
            <p className={styles.padding}>{hasDecimalPoint(product.kcal)}</p>
            <p className={styles.padding}>{hasDecimalPoint(product.fat)}</p>
            <p className={styles.padding}>{hasDecimalPoint(product.saturated_fat)}</p>
            <p className={styles.padding}>{hasDecimalPoint(product.carbs)}</p>
            <p className={styles.padding}>{hasDecimalPoint(product.protein)}</p>
        </div>
    );
}
