import dayjs from "dayjs";

import Price from "./Price";

export class Reservation {
    reservationTime: any;
    question: string;
    answer: string;
    price: Price;

    constructor(data: any){
        this.reservationTime = data.reservationTime;
        this.question = data.question;
        this.answer = data.answer;
        this.price = data.price;
    }

    get date(){
        return dayjs(this.reservationTime.seconds * 1000).format('MM/DD (DDD)');
    }

    get time(){
        return dayjs(this.reservationTime.seconds * 1000).format('aa HH:mm');
    }
}