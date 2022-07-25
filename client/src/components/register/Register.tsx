import { ChangeEvent, useEffect, useState } from 'react';
import './Register.css';
import isEmailValid from "is-valid-email"
import { useNavigate } from 'react-router';
import { transpileModule } from 'typescript';
import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';

function RegisterForm() {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  let users = useSelector((state: AppState) => state.user);

  let onChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  let onChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  let onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  let onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  let onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }

  async function onClickSignUp() {
    if (firstName == '' || lastName == '' || userName == '' || password == '' || confirmPassword == '') {
      setErrorMessage("All fields must be filled");
    }
    else {
      const user = {
        firstName, lastName, userName, password, userType: "user"
      }
      try {
        await axios.post('http://localhost:3001/users', user);
        navigate('/login');

      } catch (error) {
        console.log(error)
        alert("Failed to load resources")
      }
    }
  }

  function goToLoginPage() {
    navigate("/login");
  }

  const paperStyle = { padding: 20, height: '665px', width: 350, margin: "15px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '17px 0' }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid alignItems={"center"}>
          <Avatar style={avatarStyle}><AirplanemodeActiveOutlinedIcon /></Avatar>
          <h2>Sign Up</h2>
          <br />
        </Grid>
        <TextField label='FirstName' placeholder="Enter First Name" type="text" fullWidth required onChange={onChangeFirstName} />
        <br /><br />
        <TextField label='LastName' placeholder="Enter Last Name" type="text" fullWidth required onChange={onChangeLastName} />
        <br /><br />
        <TextField label='Username' placeholder="Enter Username" type="text" fullWidth required onChange={onChangeUserName} />
        <br /><br />
        <TextField label='Password' placeholder="Enter password" type="password" fullWidth required onChange={onChangePassword} />
        <br /><br />
        <TextField label='Confrim Password' placeholder="Confrim password" type="password" fullWidth required onChange={onChangeConfirmPassword} />
        <br />

        <Button variant="contained" color="success" style={btnstyle} fullWidth onClick={onClickSignUp} >Sign Up</Button>


        <p className="text-center text-muted mt-3 mb-0">Have already an account? <label className="fw-bold text-body" onClick={goToLoginPage}><u>Login here</u></label></p>

      </Paper>
    </Grid>


  );

}

export default RegisterForm;






// const [registeredPassowrd, setRegisteredPassword] = useState("");

  // const [repeatedPasswordFieldStyle, setRepeatedPasswordFieldStyle] = useState({});
  // const [userFieldStyle, setUserFieldStyle] = useState({});

  // const [emailFieldStyle, setEmailFieldStyle] = useState({});

  // const [passwordFieldStyle, setPasswordFieldStyle] = useState({});

  // function replaceSpecialsAndSpaces(input: string) {
  //   let format = /[^a-zA-Z0-9]/g;
  //   return format.test(input);
  // }

  // function validateUsersName(event: { target: { value: string; } }) {
  //   if (replaceSpecialsAndSpaces(event.target.value)) {
  //     setUserFieldStyle({ borderColor: "red" })
  //   }
  //   else {
  //     setUserFieldStyle({ borderColor: "" })
  //   }
  // }

  // function validateUserEmail(event: { target: { value: string; } }) {
  //   if (event.target.value.length > 3) {
  //     if (isEmailValid(event.target.value)) {
  //       setEmailFieldStyle(({ borderColor: "" }));
  //     }
  //     else {
  //       setEmailFieldStyle(({ borderColor: "red" }));
  //     }
  //   }
  //   else {
  //     setEmailFieldStyle(({ borderColor: "" }));
  //   }
  // }


  // function validateUserPassword(event: { target: { value: string; } }) {
  //   if (event.target.value.length > 5) {
  //     setPasswordFieldStyle(({ borderColor: "" }));
  //   }
  //   else {
  //     setPasswordFieldStyle(({ borderColor: "red" }));
  //   }
  //   setRegisteredPassword(event.target.value)
  // }

  // function validateIdenticalPasswords(event: { target: { value: string; } }) {
  //   if (event.target.value === registeredPassowrd) {
  //     setRepeatedPasswordFieldStyle(({ borderColor: "" }));
  //   }
  //   else {
  //     setRepeatedPasswordFieldStyle(({ borderColor: "red" }));
  //   }
  // }
















  //   <div className="registerPage">
  //     <section className="vh-100 bg-image">
  //       <div className="mask d-flex align-items-center h-100 gradient-custom-3">
  //         <div className="container h-100">
  //           <div className="row d-flex justify-content-center align-items-center h-100">
  //             <div className="col-12 col-md-9 col-lg-7 col-xl-6">
  //               <div className="card">
  //                 <div className="card-body p-5">
  //                   <h2 className="text-uppercase text-center mb-5">Create an account</h2>

  //                   <form>

  //                     <div className="form-outline mb-4">
  //                       <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={validateUsersName} style={userFieldStyle} />
  //                       <label className="form-label" htmlFor="form3Example1cg">Create Username</label>
  //                     </div>

  //                     <div className="form-outline mb-4">
  //                       <input type="email" id="form3Example3cg" className="form-control form-control-lg" onChange={validateUserEmail} style={emailFieldStyle} />
  //                       <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
  //                     </div>

  //                     <div className="form-outline mb-4">
  //                       <input type="password" id="form3Example4cg" className="form-control form-control-lg" onChange={validateUserPassword} style={passwordFieldStyle} />
  //                       <label className="form-label" htmlFor="form3Example4cg">Password</label>
  //                     </div>

  //                     <div className="form-outline mb-4">
  //                       <input type="password" id="form3Example4cdg" className="form-control form-control-lg" onChange={validateIdenticalPasswords} style={repeatedPasswordFieldStyle} />
  //                       <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
  //                     </div>

  //                     <div className="form-check d-flex justify-content-center mb-5">
  //                       <input
  //                         className="form-check-input me-2"
  //                         type="checkbox"
  //                         value=""
  //                         id="form2Example3cg"
  //                       />
  //                       <label className="form-check-label" htmlFor="form2Example3g">
  //                         I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
  //                       </label>
  //                     </div>

  //                     <div className="d-flex justify-content-center">
  //                       <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
  //                     </div>

  //                     <p className="text-center text-muted mt-5 mb-0">Have already an account? <label className="fw-bold text-body" onClick={goToLoginPage}><u>Login here</u></label></p>

  //                   </form>

  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );


