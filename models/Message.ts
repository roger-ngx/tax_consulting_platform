import dayjs  from 'dayjs'

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
        return this.message.createdAt && dayjs(this.message.createdAt.seconds * 1000).format('HH:mm a')
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