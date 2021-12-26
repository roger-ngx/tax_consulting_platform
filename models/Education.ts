export enum EDUCATION_DEGREES {
    ASSOCIATE,
    BACHELOR,
    MASTER,
    DOCTOR
}

export default class Education{
    constructor(private education: object){

    }

    get university(){
        return this.education.university;
    }

    get major(){
        return this.education.major;
    }

    get degree(){
        return this.education.degree;
    }

    get duration(){
        return this.education.startYear + ' ~ ' + this.education.endYear;
    }
}