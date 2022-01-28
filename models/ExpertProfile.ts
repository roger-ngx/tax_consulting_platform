import { State } from "../utils/Constants";
import Career from "./Career";
import Certificate from "./Certificate";
import Education from "./Education";

interface IProfile {
    introduction: string,
    photoURL: string,
    careers: Career[],
    educations: Education[],
    certificates: Certificate[],
    availableStates: State[]
}
export default class ExpertProfile{
    constructor(private profile: IProfile){
    }
}