import { Merchants } from './merchants';

export class Offers {
    id: number;
    category: number;
    title: string;
    description: string;
    merchants: Merchants[];
    valid_to: Date;
    nearestMerchant?: Merchants;

    constructor(id: number, title: string, description: string, categoryId: number,
        merchantsList: Merchants[], valid_to: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = categoryId;
        this.merchants = merchantsList;
        this.valid_to = valid_to;
    }
}