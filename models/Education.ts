export enum EDUCATION_DEGREES {
    ASSOCIATE='ASSOCIATE',
    BACHELOR='BACHELOR',
    MASTER='MASTER',
    DOCTOR='DOCTOR'
}

interface IEducation {
    university: string,
    major: string,
    degree: EDUCATION_DEGREES,
    startYear: number,
    endYear?: number,
    isStudyNow?: boolean
}

export default class Education{
    university: string;
    major: string;
    degree: EDUCATION_DEGREES;
    startYear: number;
    endYear?: number;
    isStudyNow?: boolean;

    constructor(private education: IEducation){
        this.university = education.university;
        this.major = education.major;
        this.degree = education.degree;
        this.startYear = education.startYear;
        this.endYear = education.endYear;
        this.isStudyNow = education.isStudyNow;
    }

    get duration(){
        return this.education.startYear + ' ~ ' + this.education.endYear;
    }
}