import { State } from "../utils/Constants";
import Career from "./Career";
import Certificate from "./Certificate";
import Education from "./Education";
import { map } from "lodash";

export interface IProfile {
    introduction: string,
    photo?: string,
    careers: Career[],
    educations: Education[],
    certificates: Certificate[],
    availableStates: State[],
    contactTime: number[]
}
export default class ExpertProfile{
    introduction: string;
    photo?: string;
    careers: Career[];
    educations: Education[];
    certificates: Certificate[];
    availableStates: State[];
    contactTime: number[]

    constructor(profile: IProfile){
        this.introduction = profile.introduction;
        this.photo = profile.photo;
        this.careers = profile.careers;
        this.educations = profile.educations;
        this.certificates = profile.certificates;
        this.availableStates = profile.availableStates;
        this.contactTime = profile.contactTime;
    }

    get contactTimeString(){
        const startTime = `0${this.contactTime[0]}:00`.slice(-5);
        const endTime = `0${this.contactTime[1]}:00`.slice(-5);

        return `${startTime} ~ ${endTime}`;
    }

    get locationsString(){
        return map(this.availableStates, (state: any) => state.code).join(', ');
    }
}