export const enum SERVICE_CATEGORIES {
    TAX,
    FUND,
    ACCOUNTANCY
}

export default class EnrollService {
    constructor(private service: object){

    }

    get category(){
        return this.service.category;
    }

    get detail(){
        return this.service.detail;
    }

    get images(){
        return this.service.images;
    }

    get videos(){
        return this.service.videos;
    }
}