import dayjs from 'dayjs';

interface Thread{
    updatedAt: {seconds: number};
    lastMessage: string;
    srcUserId: string;
    unRead: number;
}

export default class ChatThread{

    constructor(private thread:Thread){

    }

    get time(){
        return this.thread.updatedAt && dayjs(this.thread.updatedAt.seconds * 1000).format('HH:mm a')
    }

    get lastMessage(){
        return this.thread.lastMessage;
    }

    get unReadCount(){
        return this.thread.unRead;
    }
}