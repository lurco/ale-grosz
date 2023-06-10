import {PropsWithChildren, useEffect, useState} from 'react';
import {CategoriesContext} from "../../context/CategoriesContext.ts";
import {Category, CategoryApi, Kind} from "../../types/category.ts";

import {getData} from "../../api/api.ts";

async function getCategoriesAndSubcategories(signal: AbortSignal): Promise<Category[]> {
    const [categories, subcategories] = await Promise.all([
        getData<CategoryApi>({endpoint: '/categories', signal}),
        getData<Kind>({endpoint: '/subcategories', signal})
    ]);

    return categories.map((category) => ({
        ...category,
        subcategories: category.subcategories
            .map((subcategoryId) => subcategories
                .find((subcategory) => subcategory.id === subcategoryId))
    }));
}

function CategoriesProvider({children}: PropsWithChildren) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        getCategoriesAndSubcategories(controller.signal).then(setCategories);

        return () => {
            controller.abort();
        };
    }, [])

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    );
}

export default CategoriesProvider;
