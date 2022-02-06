interface ICarrer {
    company: string,
    position: string,
    startYear: number,
    endYear?: number,
    isWorkingNow?: boolean;
}

export default class Career {
    company: string;
    position: string;
    startYear: number;
    endYear?: number;
    isWorkingNow?: boolean;

    constructor(private career: ICarrer){
        this.company = career.company;
        this.position = career.position;
        this.startYear = career.startYear;
        this.endYear = career.endYear;
        this.isWorkingNow = career.isWorkingNow;
    }

    get duration(){
        return this.career.startYear + ' ~ ' + (this.career.isWorkingNow ? 'now' : this.career.endYear)
    }
}