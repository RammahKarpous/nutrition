// React dependencies
import { Head, useForm, usePage } from '@inertiajs/react';
import { MouseEvent, useState } from 'react';

// Types
import { type SharedData } from '@/types';

// Components
import AddProductForm from '@/components/organisms/forms/AddProductForm';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id: number;
    product_name: string;
    kcal: number;
    fat: number;
    saturated_fat: number;
    carbs: number;
    protein: number;
}

export default function AddProduct() {
    const [formAction, setFormAction] = useState<'add' | 'update'>('add');
    const [productId, setProductId] = useState(0);
    const [formData, setFormData] = useState({
        product_name: '',
        kcal: '0',
        fat: '0',
        saturated_fat: '0',
        carbs: '0',
        protein: '0',
    });

    const { products } = usePage().props as unknown as SharedData & { products: Product[] };

    const { delete: destroy } = useForm(formData);

    const styles: { [key: string]: string } = {
        headings: 'font-bold text-lg',
        grid: 'grid grid-cols-8 border-b border-background-alt',
        padding: 'px-5 py-3 ',
    };

    const deleteProduct: (e: MouseEvent<HTMLButtonElement>, id: number) => void = (e, id) => {
        e.preventDefault();
        destroy(route('product.delete', id));
    };

    return (
        <AppLayout>
            <Head title="Add product" />
            <div className="mx-auto p-5">
                <AddProductForm defaultData={formData} formAction={formAction} setFormAction={setFormAction} id={productId} />

                <div className={`${styles.grid}`}>
                    <p className={`${styles.headings} ${styles.padding}`}>Product name</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Kcal</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Fat</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Saturated fat</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Carbs</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Protein</p>
                    <p className={`${styles.headings} ${styles.padding}`}>Actions</p>
                </div>

                {products.map((product) => (
                    <div key={product.id} className={`${styles.grid}`}>
                        <p className={styles.padding}>{product.product_name}</p>
                        <p className={styles.padding}>{product.kcal}</p>
                        <p className={styles.padding}>{product.fat}</p>
                        <p className={styles.padding}>{product.saturated_fat}</p>
                        <p className={styles.padding}>{product.carbs}</p>
                        <p className={styles.padding}>{product.protein}</p>

                        <div className="flex items-center gap-8">
                            <button
                                type="submit"
                                onClick={() => {
                                    setProductId(product.id);

                                    setFormData({
                                        product_name: product.product_name,
                                        kcal: product.kcal.toString(),
                                        fat: product.fat.toString(),
                                        saturated_fat: product.saturated_fat.toString(),
                                        carbs: product.carbs.toString(),
                                        protein: product.protein.toString(),
                                    });

                                    setFormAction('update');
                                }}
                            >
                                Update
                            </button>
                            
                            <button type="submit" onClick={(e) => deleteProduct(e, product.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
