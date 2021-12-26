export default class Career {
    constructor(private career: object){
        console.log(career);
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