# Nutrition Calculation System

## Overview

The Nutrition application includes a calculation system that allows users to select food products and calculate total nutritional values based on specified quantities. The calculation system tracks:

- Calories (kcal)
- Fat content
- Saturated fat content
- Carbohydrates
- Protein

The system is designed to dynamically update calculations as users:
1. Select or remove products
2. Adjust quantities (in grams) for each product
3. View total nutritional values across all selected products

This document explains the architecture of the calculation system, the data flow, and how components interact to deliver this functionality.

## NutritionContext: State Management

The core of the calculation system is the `NutritionContext`, a React Context that centralizes state management and calculation logic.

### Context Structure

The context is defined in `resources/js/contexts/NutritionContext.tsx` and provides:

1. **State Storage**:
   - Selected products with their quantities
   - Total nutritional values across all selected products

2. **Operations**:
   - Adding products to the calculation
   - Removing products from the calculation
   - Updating product quantities (grams)
   - Clearing all selected products
   - Calculating totals

### Key Interfaces

```typescript
// Nutritional values tracked by the system
interface NutritionValues {
  grams: number;
  kcal: number;
  fat: number;
  saturated_fat: number;
  carbs: number;
  protein: number;
}

// Product with added quantity tracking
interface ProductWithGrams extends Product {
  currentGrams: number;
}

// The context API surface
interface NutritionContextType {
  selectedProducts: ProductWithGrams[];
  totalNutrition: NutritionValues;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  updateProductGrams: (productId: number, grams: number) => void;
  clearProducts: () => void;
}
```

### Context Implementation

The NutritionProvider component manages the state and provides the context to the component tree:

```typescript
export const NutritionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for selected products and calculated totals
  const [selectedProducts, setSelectedProducts] = useState<ProductWithGrams[]>([]);
  const [totalNutrition, setTotalNutrition] = useState<NutritionValues>(defaultNutritionValues);

  // Calculate totals whenever selected products change
  useEffect(() => {
    calculateTotalNutrition();
  }, [selectedProducts]);

  // Function to calculate total nutrition values
  const calculateTotalNutrition = () => {
    const newTotal = selectedProducts.reduce(
      (acc, product) => {
        return {
          grams: acc.grams + product.currentGrams,
          kcal: acc.kcal + (product.kcal * product.currentGrams),
          fat: acc.fat + (product.fat * product.currentGrams),
          saturated_fat: acc.saturated_fat + (product.saturated_fat * product.currentGrams),
          carbs: acc.carbs + (product.carbs * product.currentGrams),
          protein: acc.protein + (product.protein * product.currentGrams)
        };
      },
      { ...defaultNutritionValues }
    );

    setTotalNutrition(newTotal);
  };

  // Functions to manage product selection and quantities
  const addProduct = (product: Product) => {
    // Add product with default 1 gram if not already in list
    if (!selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, currentGrams: 1 }
      ]);
    }
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const updateProductGrams = (productId: number, grams: number) => {
    setSelectedProducts(
      selectedProducts.map(product => 
        product.id === productId 
          ? { ...product, currentGrams: grams } 
          : product
      )
    );
  };

  const clearProducts = () => {
    setSelectedProducts([]);
  };

  // Provide context to children
  return (
    <NutritionContext.Provider value={{
      selectedProducts,
      totalNutrition,
      addProduct,
      removeProduct,
      updateProductGrams,
      clearProducts
    }}>
      {children}
    </NutritionContext.Provider>
  );
};
```

### Accessing the Context

Components can access the context using the `useNutrition` hook:

```typescript
export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
```

## Data Flow

The calculation system follows this data flow:

1. **Product Data Source**:
   - Products are initially loaded from the server via Inertia props
   - Each product includes nutritional values per 100g (kcal, fat, saturated_fat, carbs, protein)

2. **Product Selection**:
   - Users select products through the ProductsModal component
   - Selected products are stored in the NutritionContext state

3. **Quantity Adjustment**:
   - Users adjust quantities (in grams) for each product
   - Changes trigger state updates in the context

4. **Calculation**:
   - The context automatically recalculates totals when products or quantities change
   - Calculations are performed by multiplying each nutritional value by the product's quantity
   - Total values are summed across all selected products

5. **Display**:
   - Individual product calculations are shown in the ProductsCalculatorTable component
   - Total nutritional values are displayed in the Calculator page

## Calculation Formula

The calculation follows this basic formula for each nutritional property:

```
For each product:
  Individual contribution = nutritional_value_per_100g × (grams/100)

Total = Sum of all individual contributions
```

In the actual implementation, the calculation is simplified since the nutritional values are already expressed per gram:

```typescript
const calculateTotalNutrition = () => {
  const newTotal = selectedProducts.reduce(
    (acc, product) => {
      return {
        grams: acc.grams + product.currentGrams,
        kcal: acc.kcal + (product.kcal * product.currentGrams),
        fat: acc.fat + (product.fat * product.currentGrams),
        saturated_fat: acc.saturated_fat + (product.saturated_fat * product.currentGrams),
        carbs: acc.carbs + (product.carbs * product.currentGrams),
        protein: acc.protein + (product.protein * product.currentGrams)
      };
    },
    { ...defaultNutritionValues }
  );

  setTotalNutrition(newTotal);
};
```

## Component Interactions

### Calculator Page (`resources/js/pages/products/calculator.tsx`)

The Calculator page is the main container for the nutrition calculation UI. It:

1. Wraps its content in the `NutritionProvider` to make the context available
2. Displays selected products in a table
3. Shows total nutritional values
4. Provides a button to open the product selection modal

```typescript
export default function Calculator() {
  return (
    <NutritionProvider>
      <CalculatorContent />
    </NutritionProvider>
  );
}

const CalculatorContent = () => {
  const { products } = usePage().props;
  const { totalNutrition, selectedProducts } = useNutrition();
  const [showModal, setShowModal] = useState(false);
  
  return (
    <AppLayout>
      <ProductsModal
        products={products}
        setShowModal={setShowModal}
        className={`transition-all ${showModal ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="mx-auto w-full max-w-7xl p-5">
        {/* Display selected products */}
        {selectedProducts.map((product) => (
          <ProductsCalculatorTable
            key={product.id}
            product={product}
            styles={styles}
          />
        ))}

        {/* Display total nutrition values */}
        <div className={`${styles.grid}`}>
          <p className={`${styles.headings} ${styles.padding}`}>Total</p>
          <p className={`${styles.headings} ${styles.padding}`}>{totalNutrition.grams}</p>
          <p className={`${styles.headings} ${styles.padding}`}>
            {totalNutrition.kcal.toFixed(2)}
          </p>
          {/* Other nutritional values... */}
        </div>

        <button 
          className="m-5 rounded-lg bg-orange-600 px-3 py-2 text-white" 
          onClick={() => setShowModal(true)}>
          Select products
        </button>
      </div>
    </AppLayout>
  );
};
```

### Products Calculator Table (`resources/js/components/organisms/ProductsCalculatorTable.tsx`)

This component displays individual product rows with:
1. Product name
2. Quantity input (grams)
3. Calculated nutritional values based on the specified quantity

```typescript
const ProductsCalculatorTable = ({ product, styles }: Props) => {
  const { updateProductGrams } = useNutrition();
  
  // Use currentGrams from the context-enhanced product
  const grams = product.currentGrams || 1;

  const handleGramsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateProductGrams(product.id, Number(event.target.value));
  };

  const getNutrition = (nutrition: number) => {
    return nutrition % 1 !== 0 ? (nutrition * grams).toFixed(2) : nutrition * grams;
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
```

### Products Modal (`resources/js/components/organisms/ProductsModal.tsx`)

This component allows users to select products for calculation:

1. Displays a list of all available products
2. Shows checkboxes for selection
3. Maintains internal state for selected items
4. Syncs with the NutritionContext when selections are confirmed

```typescript
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

  return (
    <div className={`absolute top-1/2 left-1/2 max-h-fit w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl ${className}`}>
      <div className="mt-5">
        <div className='max-h-[500px] overflow-y-auto'>
          {/* Product selection checkboxes */}
          {products.map((product) => (
            <div key={product.id}>
              <input 
                type="checkbox" 
                checked={selectedProductsList.some(item => item.id === product.id)}
                onChange={() => {
                  // Update internal selection state
                  if (selectedProductsList.some(item => item.id === product.id)) {
                    setSelectedProductsList(selectedProductsList.filter((item) => item.id !== product.id))
                  } else {
                    setSelectedProductsList([...selectedProductsList, product])
                  }
                }} />
              <label>{product.product_name}</label>
            </div>
          ))}
        </div>

        <button 
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
```

## Example Usage Flows

### Adding Products and Calculating Nutrition

1. User navigates to the Calculator page
2. User clicks "Select products" button
3. ProductsModal displays available products
4. User selects desired products and clicks "Select"
5. Products appear in the calculator table with default 1g quantity
6. User adjusts quantities for each product
7. NutritionContext automatically recalculates totals
8. User sees updated total nutrition values at the bottom of the page

### State Updates

When a user changes a product's quantity:

1. Input change triggers `handleGramsChange` in ProductsCalculatorTable
2. Component calls `updateProductGrams(productId, newGrams)` from the context
3. Context updates the product's grams in the selectedProducts state
4. State change triggers the useEffect hook in the context
5. Context recalculates all nutritional totals
6. Updated totals are displayed in the UI

## Technical Considerations

### Performance Optimization

The calculation system implements several optimizations:

1. **Selective Re-rendering**: Components only re-render when their specific dependencies change
2. **Efficient State Updates**: The context uses immutable state updates to trigger only necessary re-renders
3. **Calculation Caching**: Calculations only run when the product selection or quantities change

### Type Safety

The system leverages TypeScript for type safety:

1. Interfaces define the shape of nutritional data
2. Context API has fully typed inputs and outputs
3. Component props have explicit type definitions

### Extension Points

The calculation system can be extended in several ways:

1. **Additional Nutritional Properties**: Add new properties to the NutritionValues interface
2. **Custom Calculation Rules**: Modify the calculation formula in calculateTotalNutrition
3. **Persistence**: Add functionality to save calculation results

## Troubleshooting

Common issues and solutions:

1. **Context Not Available**: If you see "useNutrition must be used within a NutritionProvider", ensure your component is wrapped in the NutritionProvider.

2. **Calculations Not Updating**: Check that you're properly calling context methods (updateProductGrams, addProduct, etc.) and not mutating state directly.

3. **NaN Values**: Ensure all nutritional values are valid numbers before they enter the calculation system.

## Conclusion

The nutrition calculation system provides a flexible, type-safe way to perform dynamic nutritional calculations. By centralizing state in the NutritionContext, the application maintains a single source of truth while allowing different components to interact with the calculation logic.

