# Frontend Architecture Documentation

## Introduction

The Nutrition application's frontend is built as a modern Single-Page Application (SPA) using React with TypeScript. Rather than creating separate frontend and backend applications, this project uses Inertia.js as a glue layer that allows for building a single-page React application that communicates with the Laravel backend without requiring a traditional API.

This architecture provides several benefits:
- Server-side routing with client-side rendering
- Full-stack development experience without building a separate API
- Maintains Laravel's authentication system
- Enables progressive enhancement
- Reduces data transfer between client and server

## Technology Stack

### Core Technologies

- **React 18+**: A JavaScript library for building user interfaces
- **TypeScript**: Adds static typing to JavaScript for improved developer experience and code quality
- **Inertia.js**: A protocol for creating server-driven SPAs
- **Laravel**: The backend framework providing data and business logic

### Supporting Libraries

- **React Context API**: For state management across components
- **React Hooks**: For stateful logic in functional components
- **Tailwind CSS**: A utility-first CSS framework for styling

## Directory Structure

The frontend code is organized in the following structure:

```
resources/js/
├── app.tsx                # Main application entry point
├── ssr.tsx               # Server-side rendering entry point
├── components/           # Reusable UI components
│   ├── atoms/            # Small, single-purpose components
│   ├── molecules/        # Groups of atoms functioning together
│   └── organisms/        # Complex components composed of molecules
├── contexts/             # React context providers
│   └── NutritionContext.tsx  # State management for nutrition calculations
├── hooks/                # Custom React hooks
├── layouts/              # Page layout components
├── lib/                  # Utility functions and helpers
├── pages/                # Page components (corresponding to routes)
│   ├── products/
│   │   ├── add-product.tsx  # Product management page
│   │   └── calculator.tsx   # Nutrition calculator page
│   └── ...
└── types/                # TypeScript type definitions
```

## Component Architecture

The application follows a component-based architecture with an atomic design approach:

1. **Atoms**: Basic building blocks (buttons, inputs, labels)
2. **Molecules**: Groups of atoms (form fields, search bars)
3. **Organisms**: Complex components (forms, tables, modals)
4. **Layouts**: Page structures that organize organisms
5. **Pages**: Complete views composed of multiple organisms and/or templates

## Key Pages and Components

### Pages

1. **Add Product Page** (`pages/products/add-product.tsx`)
   - Displays a form for adding new products
   - Shows a table of existing products
   - Allows updating and deleting products

2. **Calculator Page** (`pages/products/calculator.tsx`)
   - Allows selection of products via a modal
   - Displays selected products with their nutritional information
   - Calculates total nutritional values based on selected products and quantities

### Key Components

1. **AddProductForm** (`components/organisms/forms/AddProductForm.tsx`)
   - Form for adding and updating product information
   - Handles validation and submission

2. **ProductsCalculatorTable** (`components/organisms/ProductsCalculatorTable.tsx`)
   - Displays product nutritional information in a tabular format
   - Allows adjustment of product quantities for calculation

3. **ProductsModal** (`components/organisms/ProductsModal.tsx`)
   - Modal dialog for selecting products to add to the calculator
   - Filters and displays available products

4. **AppLayout** (`layouts/app-layout.tsx`)
   - Main application layout with navigation and common UI elements

## State Management

The application uses several approaches for state management:

### 1. React Context API

The primary state management solution is the Context API, particularly for the nutrition calculation functionality:

```typescript
// NutritionContext manages the state for the calculator
export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<ProductWithQuantity[]>([]);
  const [totalNutrition, setTotalNutrition] = useState({
    grams: 0,
    kcal: 0,
    fat: 0,
    saturated_fat: 0,
    carbs: 0,
    protein: 0,
  });

  // Calculate totals when selected products change
  useEffect(() => {
    // Calculation logic
  }, [selectedProducts]);

  // Provide state and functions to children
  return (
    <NutritionContext.Provider value={{
      selectedProducts,
      setSelectedProducts,
      totalNutrition,
      // other functions
    }}>
      {children}
    </NutritionContext.Provider>
  );
};
```

### 2. Local Component State

For UI state that doesn't need to be shared, components use React's `useState` hook:

```typescript
const [formAction, setFormAction] = useState<'add' | 'update'>('add');
const [productId, setProductId] = useState(0);
```

### 3. Inertia.js Form Handling

Inertia's `useForm` hook is used for form state and submissions:

```typescript
const { delete: destroy } = useForm(formData);

// Usage
destroy(route('product.delete', id));
```

## Data Flow

1. **Server to Client**:
   - Initial page load: Inertia sends data as props to the React component
   - Page navigation: Inertia fetches data and updates React component props

2. **Client to Server**:
   - Form submissions: Handled by Inertia's `useForm` hook
   - Redirects: Managed by Inertia

3. **Client-side State**:
   - Managed through Context API and component state
   - Used for UI interactions and calculations that don't require server interaction

## UI/UX Patterns

### Styling Approach

The application uses Tailwind CSS for styling with consistent classes:

```typescript
const styles: { [key: string]: string } = {
  headings: 'font-bold text-lg',
  grid: 'grid grid-cols-7 border-b border-background-alt',
  padding: 'px-5 py-3 ',
};
```

### Common UI Patterns

1. **Tables**: Used for displaying product lists and nutritional information
2. **Forms**: For product data entry with validation
3. **Modals**: For product selection and other interactive tasks
4. **Buttons**: Consistent styling for primary and secondary actions
5. **Notifications**: For success/error messages

### Responsive Design

The UI is designed to be responsive using Tailwind's responsive utilities:
- Mobile-first approach
- Breakpoints for different screen sizes
- Flexible grid layouts

## Testing

Frontend components can be tested using:
- Jest for unit testing
- React Testing Library for component testing
- End-to-end testing with Laravel Dusk

## Best Practices

1. **Component Organization**:
   - Keep components focused on a single responsibility
   - Extract reusable logic into custom hooks
   - Use TypeScript interfaces for props

2. **Performance Optimization**:
   - Memoize expensive calculations
   - Use React.memo for components that render often
   - Lazy load components when appropriate

3. **Type Safety**:
   - Define interfaces for all props and state
   - Use strict TypeScript settings
   - Type check API responses

## Future Improvements

1. **State Management**: Consider Redux or other state management libraries for more complex state
2. **Component Library**: Implement a formal design system with Storybook
3. **Testing**: Increase test coverage for components
4. **Accessibility**: Enhance ARIA attributes and keyboard navigation
5. **Performance**: Implement code splitting and bundle optimization

