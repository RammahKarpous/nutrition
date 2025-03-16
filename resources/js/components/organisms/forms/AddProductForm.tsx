// React / Inertie
import { useForm } from '@inertiajs/react';
import { Dispatch, FormEvent, FormEventHandler, SetStateAction, useEffect } from 'react';

// Components
import SingleLineInput from '@/components/molecules/single-line-input';

interface formProps {
    id: number;
    defaultData: { [key: string]: string };
    formAction: string;
    setFormAction: Dispatch<SetStateAction<'add' | 'update'>>;
}

export default function AddProductForm({ id, defaultData, formAction, setFormAction }: formProps) {
    const { data, setData, post, patch } = useForm(defaultData);

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
            product_name: '',
            kcal: '0',
            fat: '0',
            saturated_fat: '0',
            carbs: '0',
            protein: '0',
        });

        setFormAction('add');
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

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
                    data={data.product_name}
                    onChange={(e) => setData('product_name', e.target.value)}
                    text="Product name"
                />

                <fieldset className="flex flex-wrap gap-5">
                    <SingleLineInput type="number" name="kcal" data={data.kcal} onChange={(e) => setData('kcal', e.target.value)} text="Kcal" />

                    <SingleLineInput type="number" name="fat" data={data.fat} onChange={(e) => setData('fat', e.target.value)} text="Fat" />

                    <SingleLineInput
                        type="number"
                        name="saturated-fat"
                        data={data.saturated_fat}
                        onChange={(e) => setData('saturated_fat', e.target.value)}
                        text="Saturated fat"
                    />

                    <SingleLineInput type="number" name="carbs" data={data.carbs} onChange={(e) => setData('carbs', e.target.value)} text="Carbs" />

                    <SingleLineInput
                        type="number"
                        name="protein"
                        data={data.protein}
                        onChange={(e) => setData('protein', e.target.value)}
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
