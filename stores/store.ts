import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import messageSlice from './messageSlide';
import fileTransferSlice from './fileTranferSlice';
import userInfoSlide from './userInfoSlide';
// const rootReducer = () => ({
//     firebase: firebaseReducer,
//     firestore: firestoreReducer
// })

const rootReducer = combineReducers({
    // Add sync reducers here
    firebase: persistReducer(
        { key: 'firebaseState', storage, stateReconciler: hardSet },
        firebaseReducer
    ),
    firestore: persistReducer(
        { key: 'firestoreState', storage, stateReconciler: hardSet },
        firestoreReducer
    ),
    fileTransfer: fileTransferSlice,
    messages: messageSlice,
    user: userInfoSlide
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['firebase', 'firestore'],
            },
        }),
})

export const persistor = persistStore(store);