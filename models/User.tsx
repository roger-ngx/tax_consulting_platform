export default class User{
    constructor(private user: object){

    }

    get name(){
        return this.user.displayName;
    }

    get photoURL(){
        return this.user.photoURL;
    }
}