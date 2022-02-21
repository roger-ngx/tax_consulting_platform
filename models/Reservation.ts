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
    expertId: string;

    constructor(data: any){
        this.id = data.id;
        this.reservationTime = data.reservationTime;
        this.question = data.question;
        this.answer = data.answer;
        this.price = data.price;
        this.status = data.status;
        this.detail = data.detail;
        this.expertId = data.expertId;
    }

    get date(){
        return this.dateTime.format('MM/DD (ddd)');
    }

    get time(){
        return this.dateTime.format('HH:mm A');
    }

    get dateTime(){
        return dayjs(this.reservationTime.seconds * 1000);
    }

    get step(){
        switch(this.status){
            case RESERVATION_STATUS.REQUEST: 
                return 1;
            
            case RESERVATION_STATUS.APPROVE: 
                return 2;

            case RESERVATION_STATUS.PROGRESS: 
                return 3;

            case RESERVATION_STATUS.COMPLETE: 
                return 4;
        }
    }
}