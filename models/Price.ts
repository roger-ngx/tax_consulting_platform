
interface IPrice {
    title?: string,
    detail?: string,
    unit?: string,
    price?: number
}
export default class Price{
    constructor(private price: IPrice){
    }

    get title(){
        return this.price.title;
    }

    get detail(){
        return this.price.detail;
    }

    get unit(){
        return this.price.unit;
    }

    get valueInDollar(){
        return this.price.price;
    }
}