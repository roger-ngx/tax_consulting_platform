import { SERVICE_CATEGORIES } from "./EnrollService";

export interface IService {
    category: SERVICE_CATEGORIES[],
    detail: string,
    photos: string[],
    videos: string[],
}
export default class ExpertService{
    category: SERVICE_CATEGORIES[];
    detail: string;
    photos: string[];
    videos: string[];

    constructor(service: IService){
        this.category = service.category;
        this.detail = service.detail;
        this.photos = service.photos;
        this.videos = service.videos;
    }
}