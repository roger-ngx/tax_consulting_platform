import dayjs from 'dayjs';

interface Thread{
    id: string;
    updatedAt: {seconds: number};
    lastMessage: string;
    lastMessageType: string;
    srcUserId: string;
    unRead: number;
}

export default class ChatThread{

    constructor(private thread:Thread){

    }

    get id(){
        return this.thread.id;
    }

    get time(){
        return this.thread.updatedAt && dayjs(this.thread.updatedAt.seconds * 1000).format('HH:mm a')
    }

    get lastMessageType(){
        return this.thread.lastMessageType;
    }

    get lastMessage(){
        switch(this.lastMessageType){
            case 'text':
                return  this.thread.lastMessage;
            case 'application/image':
                return this.srcUserId === 'thanh' ? 'You sent a photo' : 'xxx sent a photo'
            default:
                return this.srcUserId === 'thanh' ? 'You sent a file' : 'xxx sent a file'
        }
    }

    get srcUserId(){
        return this.thread.srcUserId;
    }

    get unReadCount(){
        return this.thread.unRead;
    }
}