export default class Price{
    constructor(private price: object){

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