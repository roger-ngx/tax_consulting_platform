export const enum SERVICE_CATEGORIES {
    TAX, FUND, ACCOUNTANCY,
    BOOKKEEPING,
    SPAIN, KOREA, JAPAN, CHINA
}

interface IEnrollService {
    category: string,
    detail: string,
    images: string,
    videos: string[]
}

export default class EnrollService {
    category: string;
    detail: string;
    images: string;
    videos: string[];

    constructor(private service: IEnrollService){
        this.category = service.category;
        this.detail = service.detail;
        this.images = service.images;
        this.videos = service.videos;
    }
}