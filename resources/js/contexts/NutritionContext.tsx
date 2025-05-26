import { Product } from '@/types';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface NutritionValues {
  grams: number;
  kcal: number;
  fat: number;
  saturated_fat: number;
  carbs: number;
  protein: number;
}

interface ProductWithGrams extends Product {
  currentGrams: number;
}

interface NutritionContextType {
  selectedProducts: ProductWithGrams[];
  totalNutrition: NutritionValues;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  updateProductGrams: (productId: number, grams: number) => void;
  clearProducts: () => void;
}

const defaultNutritionValues: NutritionValues = {
  grams: 0,
  kcal: 0,
  fat: 0,
  saturated_fat: 0,
  carbs: 0,
  protein: 0
};

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<ProductWithGrams[]>([]);
  const [totalNutrition, setTotalNutrition] = useState<NutritionValues>(defaultNutritionValues);

  // Calculate total nutrition whenever selected products change
  useEffect(() => {
    calculateTotalNutrition();
  }, [selectedProducts]);

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

  const addProduct = (product: Product) => {
    // Check if product is already in the list
    if (!selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, currentGrams: 1 } // Default to 1 gram
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

  const value = {
    selectedProducts,
    totalNutrition,
    addProduct,
    removeProduct,
    updateProductGrams,
    clearProducts
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};

