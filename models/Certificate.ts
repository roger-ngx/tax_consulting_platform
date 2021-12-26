export default class Certificate{
    constructor(private certificate: object){

    }

    get name(){
        return this.certificate.name;
    }

    get authority(){
        return this.certificate.authority;
    }
}