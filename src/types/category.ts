export interface Kind {
    id: number;
    name: string;
}

export interface Category extends Kind {
    subcategories: Array<Kind | undefined>;
}

export interface CategoryApi extends Kind {
    subcategories: number[];
}
