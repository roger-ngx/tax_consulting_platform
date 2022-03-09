export interface IUser {
    displayName: string,
    photoURL: string,
    email: string;
    phoneNumber: string;
    uid: string;
}

export default class User{
    displayName: string;
    photoURL: string;
    email: string;
    phoneNumber: string;
    uid: string;

    constructor(private user: any){
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.uid = user.uid;
    }

    get original(){
        return this.user;
    }
}