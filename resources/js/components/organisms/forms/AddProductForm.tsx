// React / Inertie
import { useForm } from '@inertiajs/react';
import { Dispatch, FormEvent, FormEventHandler, SetStateAction, useEffect, useState } from 'react';
import { z } from 'zod';

// Components
import SingleLineInput from '@/components/molecules/single-line-input';

// Types
import { Product } from '@/types';

interface formProps {
    id: number;
    defaultData: Product;
    formAction: string;
    setFormAction: Dispatch<SetStateAction<'add' | 'update'>>;
}

const schema = z.object({
    product_name: z.string().min(1, 'Product name is required'),
    kcal: z.number().min(0, 'Kcal must be greater than 0'),
    fat: z.number().min(0, 'Kcal must be greater than 0'),
    saturated_fat: z.number().min(0, 'Kcal must be greater than 0'),
    carbs: z.number().min(0, 'Kcal must be greater than 0'),
    protein: z.number().min(0, 'Kcal must be greater than 0'),
});

export default function AddProductForm({ id, defaultData, formAction, setFormAction }: formProps) {
    const formData = {
        user_id: defaultData.user_id,
        product_name: defaultData.product_name,
        kcal: defaultData.kcal,
        fat: defaultData.fat,
        saturated_fat: defaultData.saturated_fat,
        carbs: defaultData.carbs,
        protein: defaultData.protein,
    };

    const { data: ProductData, setData, post, patch } = useForm(formData);
    type ProductData = z.infer<typeof schema>;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setData(defaultData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultData]);

    const update: (e: FormEvent<HTMLFormElement>, id: number) => void = (e, id) => {
        e.preventDefault();

        patch(route('product.update', id), {
            preserveScroll: true,
        });

        setData({
            user_id: 1,
            product_name: '',
            kcal: 0,
            fat: 0,
            saturated_fat: 0,
            carbs: 0,
            protein: 0,
        });

        setFormAction('add');
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const validation = schema.safeParse(ProductData);

        if (!validation.success) {
            setErrors(validation.error.format());
            return;
        }

        post(route('product.create'), {
            preserveScroll: true,
        });

        setData(defaultData);
    };

    return (
        <>
            <h1 className="text-3xl font-bold">Add Product</h1>

            <form
                onSubmit={formAction === 'add' ? submit : (e) => update(e, id)}
                className="border-background-alt mt-4 mb-10 flex flex-col items-start gap-6 border-b pb-10"
            >
                <SingleLineInput
                    name="product-name"
                    data={ProductData.product_name}
                    onChange={(e) => setData('product_name', e.target.value)}
                    text="Product name"
                    errorMessage={errors?.product_name?._errors?.[0]}
                    className={`border `}
                />

                <fieldset className="flex flex-wrap gap-5">
                    <SingleLineInput
                        type="number"
                        name="kcal"
                        data={Number(ProductData.kcal)}
                        errorMessage={errors?.kcal?._errors?.[0]}
                        onChange={(e) => setData('kcal', Number(e.target.value))}
                        text="Kcal"
                    />

                    <SingleLineInput
                        type="number"
                        name="fat"
                        data={Number(ProductData.fat)}
                        errorMessage={errors?.fat?._errors?.[0]}
                        onChange={(e) => setData('fat', Number(e.target.value))}
                        text="Fat"
                    />

                    <SingleLineInput
                        type="number"
                        name="saturated-fat"
                        data={Number(ProductData.saturated_fat)}
                        errorMessage={errors?.saturated_fat?._errors?.[0]}
                        onChange={(e) => setData('saturated_fat', Number(e.target.value))}
                        text="Saturated fat"
                    />

                    <SingleLineInput
                        type="number"
                        name="carbs"
                        data={Number(ProductData.carbs)}
                        errorMessage={errors?.carbs?._errors?.[0]}
                        onChange={(e) => setData('carbs', Number(e.target.value))}
                        text="Carbs"
                    />

                    <SingleLineInput
                        type="number"
                        name="protein"
                        data={Number(ProductData.protein)}
                        errorMessage={errors?.protein?._errors?.[0]}
                        onChange={(e) => setData('protein', Number(e.target.value))}
                        text="Protein"
                    />
                </fieldset>

                <div>
                    <button type="submit" className="cursor-pointer rounded bg-orange-500 px-4 py-2 text-white transition-all hover:bg-orange-600">
                        {formAction === 'add' ? 'Add' : 'Update'} Product
                    </button>
                </div>

                <p className="italic opacity-65">All products added are based on 1g</p>
            </form>
        </>
    );
}
