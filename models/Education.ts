export enum EDUCATION_DEGREES {
    ASSOCIATE,
    BACHELOR,
    MASTER,
    DOCTOR
}

interface IEducation {
    university?: string,
    major?: string,
    degree?: EDUCATION_DEGREES,
    startYear?: number,
    endYear?: number,
    isStudyNow?: boolean
}

export default class Education{
    constructor(private education: IEducation){

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