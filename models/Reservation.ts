import dayjs from "dayjs";

import Price from "./Price";

export enum RESERVATION_STATUS {
    REQUEST='REQUEST',
    APPROVE='APPROVE',
    PROGRESS='PROGRESS',
    COMPLETE='COMPLETE',
    CANCEL='CANCEL'
}

export class Reservation {
    id: string;
    reservationTime: any;
    question: string;
    answer: string;
    price: Price;
    status: RESERVATION_STATUS;
    detail?:string;

    constructor(data: any){
        this.id = data.id;
        this.reservationTime = data.reservationTime;
        this.question = data.question;
        this.answer = data.answer;
        this.price = data.price;
        this.status = data.status;
        this.detail = data.detail;
    }

    get date(){
        return dayjs(this.reservationTime.seconds * 1000).format('MM/DD (ddd)');
    }

    get time(){
        return dayjs(this.reservationTime.seconds * 1000).format('a HH:mm');
    }
}