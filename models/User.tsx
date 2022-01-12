interface IUser {
    displayName: string,
    photoURL: string
}

export default class User{
    constructor(private user: any){
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