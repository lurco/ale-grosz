import {createContext} from "react";
import {Category} from "../types/category.ts";

export const CategoriesContext = createContext<Category[] | null>([{
        id: 1,
        name: 'PCs',
        subcategories: [{
            id: 1,
            name: "laptops"
        }]
}])
