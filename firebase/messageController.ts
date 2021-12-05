import firebase from './firebaseInit';
import dayjs from 'dayjs';
import { FileUpload, setFileStatus } from '../stores/fileTranferSlice';
import { Dispatch } from 'redux';
import { merge } from 'lodash';


export const addMessage = async ({srcUserId, desUserId, message, type='text', name, size} : {srcUserId: string, desUserId: string, message: string, type?: string, name?: string, size: number}) => {
    try{
        const docId = srcUserId.localeCompare(desUserId) === -1 ? (srcUserId + desUserId) : (desUserId + srcUserId);

        const  batch = firebase.firestore().batch();

        batch.set(
            firebase.firestore().collection('chats').doc(docId),
            {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastMessage: message,
                srcUserId,
                unReadCount: firebase.firestore.FieldValue.increment(1),
                users: [srcUserId, desUserId]
            },
            {
                merge: true
            }
        )

        batch.set(
            firebase.firestore().collection('chats').doc(docId).collection('messages').doc(),
            merge(
                {
                    message,
                    type,
                    srcUserId,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    unRead: true
                },
                type==='file' ? {name, size} : {}
            )
        )

        await batch.commit();
    }catch(ex){
        console.log('addMessage', ex);
    }
}



export const uploadFile = ({file, srcUserId, desUserId, dispatch}: {file: File, srcUserId: string, desUserId: string, dispatch: Dispatch}) => {

    try{
        const fileUpdateStatus : FileUpload = {
            name: '',
            status: '',
            percentage: 0,
            downloadUrl: '',
            size: (file.size / 10000000).toFixed(1),
            localPath: '',
            createdAt: dayjs().toDate(),
            type: file.type
        };

        const location = file.type.includes('image') ? `images/${dayjs().unix()}${file.name}` : `files/${dayjs().unix()}${file.name}`;
    
        var storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(location).put(file);
    
        fileUpdateStatus.name = location;
        fileUpdateStatus.localPath = URL.createObjectURL(file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                fileUpdateStatus.percentage = progress;
    
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        fileUpdateStatus.status = 'paused';
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        fileUpdateStatus.status = 'running';
                        break;
                }
    
                dispatch(setFileStatus({...fileUpdateStatus}));
            }, 
            (error) => {
                // Handle unsuccessful uploads
                fileUpdateStatus.status = 'error';
                dispatch(setFileStatus({...fileUpdateStatus}));

                console.log(error);
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    fileUpdateStatus.status = 'done';
                    fileUpdateStatus.downloadUrl = downloadURL;
    
                    dispatch(setFileStatus({...fileUpdateStatus}));

                    addMessage({srcUserId, desUserId, message: downloadURL, name: file.name, size: (file.size / 10000000).toFixed(1), type: file.type})
                });
            }
        );
    }catch(ex){
        console.log(ex);
    }
}