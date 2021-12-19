export default class User{
    constructor(private user: object){

    }

    get original(){
        return this.user;
    }

    get name(){
        return this.user.displayName;
    }

    get photoURL(){
        return this.user.photoURL;
    }
}