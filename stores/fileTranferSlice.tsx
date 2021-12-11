import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { findIndex } from 'lodash';

export interface FileTransferState {
    uploadFiles: FileUpload[]
}

export interface FileUpload {
    name: string;
    status: string;
    percentage: number;
    downloadUrl: string;
    size?: string;
    localPath: string;
    createdAt: Date;
    type: string;
}

const initialState : FileTransferState = {
    uploadFiles : []
}

export const fileTransferSlice = createSlice({
    name: 'filerTranfer',
    initialState,
    reducers: {
        setFileStatus: (state :FileTransferState, action: PayloadAction<FileUpload>) => {
            const data: FileUpload = action.payload;

            const index = findIndex(state.uploadFiles, (file) => file.name === data.name);
            if(index>=0){
                state.uploadFiles[index] = data;
            }else{
                state.uploadFiles.unshift(data);
            }
        }
    }
})

export const { setFileStatus } = fileTransferSlice.actions;

export default fileTransferSlice.reducer;