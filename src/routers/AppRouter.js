
import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect

} from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { GrettingScreen } from '../components/Gretting/GrettingScreen';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checkin, setcheckin] = useState(true)

    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setisLoggedIn(true)
            } else {
                setisLoggedIn(false)
            }

            setcheckin(false)
        });
    }, [dispatch, setcheckin, setisLoggedIn])

    if (checkin) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />
                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={GrettingScreen}
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
