import { SERVICE_CATEGORIES } from "./EnrollService";

interface IService {
    category: SERVICE_CATEGORIES,
    detail: string,
    photos: string[],
    videos: string[],
}
export default class ExpertService{
    constructor(private service: IService){
    }
}