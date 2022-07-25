import { Avatar, Checkbox, Grid, Paper, TextField, Typography, Link } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import { ChangeEvent, useState } from "react";
import { ActionType } from "../../redux/action-type";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import axios, { AxiosResponse } from "axios";
import { IUser } from "../Models/IUsers";
import { UserType } from "../Models/user-type";
import jwt_decode from "jwt-decode";


export default function Login() {
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
 
    const dispatch = useDispatch();
    //  let userType = useSelector((state: AppState) => state.UserType);

    let users = useSelector((state: AppState) => state.user);

    let onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }

    let onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const onRegisterClicked = () => {
        navigate('/Register');
    }

    const paperStyle = { padding: 20, height: '490px', width: 350, margin: "25px auto" }
    const avatarStyle = { backgroundColor: 'rgb(25 118 210)' }
    const btnstyle = { margin: '17px 0' }

    const onClickLogin = async (event: any) => {
        event.preventDefault();
        let user = {
            username: username,
            password: password
        }
        try {
            validateInput(user);
            const response = await axios.post<any>('http://localhost:3001/users/login', user);
            let token = response.data.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            const updatedLikedStadiums = new Set();
            for (let i = 0; i < response.data.userLikedStadiums.length; i++) {
                updatedLikedStadiums.add(response.data.userLikedStadiums[i]);
            }

            dispatch({ type: ActionType.UpdateLikes, payload: updatedLikedStadiums });

            let userLogin = convertLoginDataToIUser(response)
            dispatch({ type: ActionType.LoginUser, payload: userLogin })

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('likedStadiums', JSON.stringify(response.data.userLikedStadiums));
            sessionStorage.setItem('user', JSON.stringify(userLogin))
            navigate('/');
        }
        catch (error) {
            setErrorMessage("Username or Password are Incorrect");
            console.log(error);
        }
    }
    
    const convertLoginDataToIUser = (serverResponse: AxiosResponse<any, any>): IUser => {
        let userLogin = serverResponse.data;
        let token = serverResponse.data.token;
        let tokenInfo: any = jwt_decode(token);
        let type = UserType.user

        const updatedLikedStadiums = new Set<number>();
        for (let i = 0; i < userLogin.userLikedStadiums.length; i++) {
            updatedLikedStadiums.add(userLogin.userLikedStadiums[i]);
        }

        if (tokenInfo.userType == "admin") {
            type = UserType.admin
        }

        let user: IUser = {
            userId: tokenInfo.userId,
            firstName: userLogin.firstName,
            lastName: userLogin.lastName,
            userType: type,
            likedStadiums: updatedLikedStadiums
        }
        return user;
    }

    const validateInput = (user: object) => {
        if (username == "" || password == "") {
            setErrorMessage("Fields cannot be empty");
        }
        else {
            setErrorMessage("");
        }
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems={"center"}>
                    <Avatar style={avatarStyle}><SportsSoccerIcon /></Avatar>
                    <h2>Log In</h2>
                </Grid>
                <br />
                <TextField label='Username' placeholder="Enter username" fullWidth required onChange={onChangeUserName} />
                <br /><br />
                <TextField label='Password' placeholder="Enter password" type={"password"} fullWidth required onChange={onChangePassword} />
                <br /><br /><br />
                <Button variant="contained" style={btnstyle} fullWidth onClick={onClickLogin} >Sign in</Button>

                <Typography> Don't Have An Account?
                    <br/>
                    <Link href="#" onClick={onRegisterClicked}>
                        Register Here!
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}




