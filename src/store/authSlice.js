import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase.js';

import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc,query, where } from 'firebase/firestore';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    records: [],
    selectedRecord: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
        addRecordStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addRecordSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        addRecordFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setRecords: (state, action) => {
            state.records = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        clearRecordError: (state) => {
            state.error = null;
        },
        setSelectedRecord: (state, action) => {
            state.selectedRecord = action.payload;
            state.isLoading = false;
            state.error = null;
        },
    },
});

// const userId = getState().auth.user.uid; // Get the logged-in user's ID

export const getRecords = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const currentUser = getState().auth.user;
        console.log(currentUser.uid)
        if (!currentUser) {
            throw new Error("No user is currently authenticated.");
        }


        // Reference the user's 'records' subcollection
        // const recordsCollection = collection(db, 'users', currentUser.uid, 'wills');
        // const recordsCollection = collection(db, 'wills')
        // console.log(db)
        // const querySnapshot = await getDocs(recordsCollection);

        // const recordsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // console.log("recordsData", recordsData)




        const { uid } = getState().auth.user;  // Get the authenticated user's UID
        const q = query(collection(db, 'wills'), where('uid', '==', uid)); // Query records where the UID matches the logged-in user
        const snapshot = await getDocs(q);
        const recordsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(setRecords(recordsData));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const addRecord = (recordData) => async (dispatch, getState) => {
    dispatch(addRecordStart());
    try {
        // const recordsCollection = collection(db, 'wills');
        // await addDoc(recordsCollection, recordData);
        // dispatch(addRecordSuccess());
        // dispatch(getRecords());
        const { uid } = getState().auth.user;  // Get the authenticated user's UID from the state
        const recordWithUID = { ...recordData, uid,     createdAt: new Date()};  // Attach the UID to the new record
        console.log(recordWithUID)

        await addDoc(collection(db, 'wills'), recordWithUID);  // Add the new record to Firestore
        console.log(recordWithUID)
        dispatch(addRecordSuccess());
        dispatch(getRecords());
    } catch (error) {
        dispatch(addRecordFailure(error.message));
    }
};

export const updateRecord = ({id, updatedRecord}) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const recordDoc = doc(db, 'wills', id);  // Reference to the specific document by ID
        await updateDoc(recordDoc, updatedRecord);  // Update the document in Firestore
        dispatch(getRecords());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const deleteRecord = (recordId) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await deleteDoc(doc(db, 'wills', recordId));
        dispatch(getRecords());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const fetchRecord = (recordId) => async (dispatch, getState) => {
    dispatch(setLoading());
    console.log("REC ID", recordId)
    try {
        // const recordRef = doc(db, 'wills', recordId);
        // const q = query(collection(db, 'wills'), where('id', '==', recordId)); // Query records where the UID matches the logged-in user
        //
        // const docSnap = await getDocs(q);
        // console.log("docSnap - ", docSnap)


        const { uid } = getState().auth.user;  // Get the authenticated user's UID from the state
        const recordDocRef = doc(db, 'wills', recordId);  // Reference to the specific document by its ID
        const docSnapshot = await getDoc(recordDocRef);

        if (docSnapshot.exists()) {
            const recordData = docSnapshot.data();

            // Ensure the record belongs to the authenticated user
            if (recordData.uid === uid) {
                    dispatch(setSelectedRecord({ id: docSnapshot.id, ...recordData }));
            } else {
                dispatch(setError('Record not found'));
                throw new Error('Unauthorized access to this record');
            }
        } else {
            dispatch(setError('Record not found'));
            throw new Error('Record not found');
        }

        // if (docSnap.exists()) {
        //     dispatch(setSelectedRecord({ id: docSnap.id, ...docSnap.data() }));
        // } else {
        //     dispatch(setError('Record not found'));
        // }
    } catch (error) {
        dispatch(setError(error.message));
    }
};


export const { setUser, setLoading, setError, clearUser,addRecordStart,
    addRecordSuccess,
    addRecordFailure,
    setRecords,
    clearRecordError,
    setSelectedRecord } = authSlice.actions;
export default authSlice.reducer;





/*
import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    records: [],
    selectedRecord: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
        addRecordStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addRecordSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        addRecordFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setRecords: (state, action) => {
            state.records = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        clearRecordError: (state) => {
            state.error = null;
        },
        setSelectedRecord: (state, action) => {
            state.selectedRecord = action.payload;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const getRecords = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const recordsCollection = collection(db, 'records');
        console.log("recordsCollection", recordsCollection)
        const querySnapshot = await getDocs(recordsCollection);
        const recordsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch(setRecords(recordsData));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const addRecord = (recordData) => async (dispatch) => {
    dispatch(addRecordStart());
    try {
        const recordsCollection = collection(db, 'records');
        await addDoc(recordsCollection, recordData);
        dispatch(addRecordSuccess());
        dispatch(getRecords());
    } catch (error) {
        dispatch(addRecordFailure(error.message));
    }
};

export const updateRecord = (updatedRecord) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const recordRef = doc(db, 'records', updatedRecord.id);
        await updateDoc(recordRef, updatedRecord);
        dispatch(getRecords());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const deleteRecord = (recordId) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await deleteDoc(doc(db, 'records', recordId));
        dispatch(getRecords());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const fetchRecord = (recordId) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const recordRef = doc(db, 'records', recordId);
        const docSnap = await getDoc(recordRef);

        if (docSnap.exists()) {
            dispatch(setSelectedRecord({ id: docSnap.id, ...docSnap.data() }));
        } else {
            dispatch(setError('Record not found'));
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const {
    setUser,
    setLoading,
    setError,
    clearUser,
    addRecordStart,
    addRecordSuccess,
    addRecordFailure,
    setRecords,
    clearRecordError,
    setSelectedRecord
} = authSlice.actions;
export default authSlice.reducer;
*/
