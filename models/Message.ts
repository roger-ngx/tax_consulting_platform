import dayjs  from 'dayjs'

var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

export enum MESSAGE_TYPE {
    TEXT='text',
    IMAGE='image',
    FILE='file'
}

interface IMessage{
    id: string;
    message: string;
    createdAt: {seconds: number};
    srcUserId: string;
    type: MESSAGE_TYPE;
    name?: string;
    size?: number;
}

export class Message{
    constructor(private message: IMessage){

    }

    get id(){
        return this.message.id;
    }

    get time(){
        if(!this.message.createdAt) return '';

        const createdAt = dayjs(this.message.createdAt.seconds * 1000);

        if(dayjs().isSame(createdAt, 'day')){
            return createdAt.format('hh:mm a');
        }

        if(dayjs().isSame(createdAt, 'month')){
            return createdAt.format('Do hh:mm a');
        }
        
        if(dayjs().isSame(createdAt, 'year')){
            return createdAt.format('MMM Do hh:mm a');
        }

        return createdAt.format('YYYY MMM Do hh:mm a');
    }

    get text(){
        return this.message.message;
    }

    get srcUserId(){
        return this.message.srcUserId;
    }

    get type(){
        return this.message.type;
    }

    get name(){
        return this.message.name;
    }

    get size(){
        return this.message.size;
    }
}