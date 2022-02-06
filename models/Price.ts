
export type ExpertPriceType = {
    options: Price[],
    isNegotiable: boolean
}
export interface IPrice {
    title?: string,
    detail?: string,
    unit?: string,
    value?: number
}
export default class Price{
    title?: string;
    detail?: string;
    unit?: string;
    value?: number;

    constructor(price: IPrice){
        this.title = price.title;
        this.detail = price.detail;
        this.unit = price.unit;
        this.value = price.value;
    }
}