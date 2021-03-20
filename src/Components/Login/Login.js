import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { LoggedInContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });
    let provider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                const { displayName, email } = res.user
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.isSignedIn = true;
                    newUserInfo.name = displayName;
                    newUserInfo.email = email;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleBlur = (e) => {
        let isFormValid;
        if (e.target.name === 'name') {
            isFormValid = e.target.value.length > 5;
            const newUserInfo = { ...user };
            newUserInfo.error = 'Name length is short';
            setUser(newUserInfo);
        }
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
            const newUserInfo = { ...user };
            newUserInfo.error = 'email not valid';
            setUser(newUserInfo);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 5;
            const hasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid;
            const newUserInfo = { ...user };
            newUserInfo.error = 'Password length is short';
            setUser(newUserInfo);
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const { displayName, email } = res.user
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.isSignedIn = true;
                    newUserInfo.name = displayName;
                    newUserInfo.email = email;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const setUserName = name => {
        let user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(res => {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="row text-center justify-content-center">
                    <div className="col-md-8">
                        <div className="form-content">
                            <input type="checkbox" onChange={() => setNewUser(!newUser)} id="newUser" />
                            <label htmlFor="newUser">Sign Up</label>
                            <form>
                                <div className="mb-3">
                                    {newUser && <input type="text" name="name" className="form-control" placeholder="Name" required onBlur={handleBlur} />}
                                </div>
                                <div className="mb-3">
                                    <input type="email" name="email" className="form-control" placeholder="Email" required onBlur={handleBlur} />
                                </div>
                                <div className="mb-3">
                                    <input type="password" name="password" className="form-control" placeholder="Password" required onBlur={handleBlur} />
                                </div>
                                <button className="btn btn-primary" onClick={handleSubmit}>{newUser ? 'Sign Up' : 'Sign In'}</button>
                            </form>
                            <p className="text-danger">{user.error}</p>
                            {user.success && <p className="text-success">User {newUser ? 'Created' : 'Logged In'} successfully</p>}
                        </div>
                    </div>

                    <div className="col-md-8">
                        <button className="btn btn-secondary" onClick={handleGoogleSignIn}>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;