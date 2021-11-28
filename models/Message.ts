import { Dayjs }  from 'dayjs'

export enum MESSAGE_TYPE {
    TEXT, IMAGE, FILE
}

export interface IMessage {
    text: string;
    time: Dayjs;
    type: MESSAGE_TYPE
}