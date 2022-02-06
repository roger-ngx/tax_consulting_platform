export interface ICertificate{
    name?: string,
    authority?: string
}
export default class Certificate{
    name?: string;
    authority?: string;

    constructor(private certificate: ICertificate){
        this.name = certificate.name;
        this.authority = certificate.authority;
    }
}