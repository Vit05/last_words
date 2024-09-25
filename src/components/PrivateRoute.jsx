// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
//
// const PrivateRoute = ({ children }) => {
//     const user = useSelector((state) => state.auth.user);
//
//     return user ? children : <Navigate to="/" />;
// };
//
// export default PrivateRoute;


import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js'; // Make sure your Firebase config is imported

const PrivateRoute = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    // Listen for Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthLoading(false); // Firebase finished loading
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    // If Firebase is still loading the auth state, show a loading spinner
    if (authLoading) {
        return <div>Loading...</div>; // Customize this as needed
    }

    // If the user is authenticated, render the child components; otherwise, redirect
    return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;