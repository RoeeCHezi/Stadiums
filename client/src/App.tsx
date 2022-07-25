import { Login } from '@mui/icons-material';
import { Route, Routes } from 'react-router';
import './App.css';
import LoginForm from './components/login/Login';
import Menubar from './components/menubar/Menubar';
import RegisterForm from './components/register/Register';
import StadiumContainer from './components/stadiumcontainer/StadiumContainer';
import WelcomeTitle from './components/welcometitle/WelcomeTitle';
import AddNewStadium from './components/addnewstadium/AddNewStadium';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { ActionType } from './redux/action-type';
import { IStadiums } from './components/Models/IStadiums';
import EditStadium from './components/editStadium/EditStadium';
import ViewStats from './components/stats/ViewStats';

function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    initStadiums();
    initUser();
  }, [])

  const initStadiums = async () => {
    const response = await axios.get<IStadiums[]>("http://localhost:3001/stadiums");
    let stadiums = response.data;
    dispatch({ type: ActionType.GetAllStadiums, payload: stadiums });
    dispatch({ type: ActionType.SortStadiums });
  }

  const initUser = async () => {
    const loggedInUser = sessionStorage.getItem('user')
    const loggedUserToken = sessionStorage.getItem('token')

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + loggedUserToken;
      dispatch({ type: ActionType.LoginUser, payload: user });
    }

    const likedStadiums = sessionStorage.getItem('likedStadiums');
    if (likedStadiums != null) {
      let likedStadiumsArray = JSON.parse(likedStadiums);
      let newSetLike = new Set();
      for (let i = 0; i < likedStadiumsArray.length; i++) {
        newSetLike.add(likedStadiumsArray[i]);
      }
      dispatch({ type: ActionType.UpdateLikes, payload: newSetLike });
    }
  }

  return (
    <div className="App">
      <header>
        <Menubar />
        <br /><br /><br />
      </header>

      <Routes>
        <Route path="/" element={<StadiumContainer />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/addnewstadium" element={<AddNewStadium />} />
        <Route path="/editStadium/:id" element={<EditStadium />} />
        <Route path="/viewStats" element={<ViewStats />} />
      </Routes>
    </div>
  );
}

export default App;
