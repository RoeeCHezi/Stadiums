import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import { UserType } from '../Models/user-type';
import './Menubar.css';

export default function Menubar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onHomeClicked = () => {
        navigate('/');
    }
    const onLoginClicked = () => {
        navigate('/login');
    }

    const onLogoutClicked = () => {
        let clearLikesSet = new Set();
        dispatch({ type: ActionType.UpdateLikes, payload: clearLikesSet })
        dispatch({ type: ActionType.Logout })
        sessionStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = '';
        navigate("/")
    }

    const onViewStatsClicked = () => {
        navigate('/viewStats');
    }

    const onRegisterClicked = () => {
        navigate('/Register');
    }

    const onAddNewStadiumClicked = () => {
        navigate('/AddNewStadium');
    }

    const user = useSelector((state: AppState) => state.user);

    const isUser = user.userType == UserType.user;
    const isAdmin = user.userType == UserType.admin;
    const isGuest = user.userType == UserType.guest;

    return (
        <div className="nav-bar">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand title">World Of Football</a>
                <a className="navbar-brand text-light">Hello : {user.firstName}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item nav-home">
                            <a href="#" onClick={onHomeClicked} className="nav-link">Home</a>
                        </li>

                        {isAdmin && <li className="nav-item nav-addNew">
                            <a href="#" onClick={onAddNewStadiumClicked} className="nav-link" id="addNew">Add New Stadium</a>
                        </li>}

                        {isAdmin && <li className="nav-item nav-stats">
                            <a href="#" onClick={onViewStatsClicked} className="nav-link" id="stats">View Stats</a>
                        </li>}

                        {isGuest && <li className="nav-item nav-login">
                            <a href="#" onClick={onLoginClicked} className="nav-link" id="Login">Login</a>
                        </li>}
                        {isGuest && <li className="nav-item nav-register">
                            <a href="#" onClick={onRegisterClicked} className="nav-link" id="Register">Register</a>
                        </li>}
                        {!isGuest && <li className="nav-item nav-logout">
                            <a href="#" onClick={onLogoutClicked} className="nav-link" >Logout</a>
                        </li>}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
