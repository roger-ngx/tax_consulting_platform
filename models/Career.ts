interface ICarrer {
    company: string,
    position: string,
    startYear: number,
    endYear?: number,
    isWorkingNow?: boolean;
}

export default class Career {
    constructor(private career: ICarrer){
    }

    get company(){
        return this.career.company;
    }

    get position(){
        return this.career.position;
    }

    get duration(){
        return this.career.startYear + ' ~ ' + (this.career.isWorkingNow ? 'now' : this.career.endYear)
    }
}