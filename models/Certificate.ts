interface ICertificate{
    name?: string,
    authority?: string
}
export default class Certificate{
    constructor(private certificate: ICertificate){

    }

    get name(){
        return this.certificate.name;
    }

    get authority(){
        return this.certificate.authority;
    }
}