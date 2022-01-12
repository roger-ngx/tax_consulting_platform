export const enum SERVICE_CATEGORIES {
    TAX,
    FUND,
    ACCOUNTANCY
}

interface IEnrollService {
    category: string,
    detail: string,
    images: string,
    videos: string[]
}

export default class EnrollService {
    constructor(private service: IEnrollService){

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