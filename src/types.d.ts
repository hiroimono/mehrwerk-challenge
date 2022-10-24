export interface Category {
    id: string;
    name: string;
}

export interface CashbackRate {
    amount: number;
    type: string;
    description: string;
}

export interface Shop {
    id: string;
    active: number;
    top: number;
    name: string;
    createdAt: string;
    createdAtTimestamp: any;
    updatedAt: string;
    updatedAtTimestamp: any;
    complainable: boolean;
    popularity: number;
    description: string;
    important: string;
    categories: Category[];
    similarShops: any[];
    tags: any[];
    vouchers: any[];
    minimumCashback: number;
    minimumCashbackType: string;
    maximumCashback: number;
    maximumCashbackType: string;
    isFavorite: boolean;
    cashbackRates: CashbackRate[];
    isExtensionVisible: boolean;
    link: string;
    logo: string;
}

export interface Shops {
    currentPage: number;
    numberOfPages: number;
    numberOfResults: number;
    items: Shop[];
}

export interface Token {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: any[];
}