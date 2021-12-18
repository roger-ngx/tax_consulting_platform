import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

interface Thread{
    id: string;
    updatedAt?: {seconds: number};
    lastMessage?: string;
    lastMessageType?: string;
    srcUserId?: string;
    unRead?: number;
    userIDs: string[]
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

    lastMessage = (userId: string, desUsername: string) => {
        switch(this.lastMessageType){
            case 'text':
                return  (this.srcUserId === userId ? 'You: ' : `${desUsername}: `) + this.thread.lastMessage;
            case 'application/image':
                return this.srcUserId === userId ? 'You sent a photo' : `${desUsername} sent a photo`
            default:
                return this.srcUserId === userId ? 'You sent a file' : `${desUsername} sent a file`
        }
    }

    get srcUserId(){
        return this.thread.srcUserId;
    }

    get unReadCount(){
        return this.thread.unRead;
    }

    get userIDs(){
        return this.thread.userIDs;
    }
}