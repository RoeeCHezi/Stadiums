import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import Box from '@mui/material/Box';
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material"
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import Button from '@mui/material/Button';

import './EditStadium.css';

export default function Editstadium() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();
    const id = params.id || "0"

    const allStadiumsArray = useSelector((state: AppState) => state.allStadiumsArray);

    const [stadiumName, setStadiumName] = useState('');
    const [destination, setDestination] = useState('');
    const [img, setImg] = useState('');
    const [matchDetails, setMatchDetails] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [price, setPrice] = useState('');
    const [descriptionCapacity, setDescriptionCapacity] = useState('');
    const [descriptionYearBuilt, setDescriptionYearBuilt] = useState('');
    const [descriptionConstructionCost, setDescriptionConstructionCost] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const stadium = allStadiumsArray.find(stadium => +stadium.id === parseFloat(id))
        if (stadium) {
            setStadiumName(stadium.stadiumName)
            setDestination(stadium.destination)
            setImg(stadium.img)
            setMatchDetails(stadium.matchDetails)
            setMatchDate(stadium.matchDate)
            setPrice(stadium.price.toString())
            setDescriptionCapacity(stadium.stadiumDescriptionCapacity)
            setDescriptionYearBuilt(stadium.stadiumDescriptionYearBuilt)
            setDescriptionConstructionCost(stadium.stadiumDescriptionConstCost)
        }
    }, [allStadiumsArray]);

    const onChangeStadiumName = (event: ChangeEvent<HTMLInputElement>) => {
        setStadiumName(event.target.value)
    }
    const onChangeDestination = (event: ChangeEvent<HTMLInputElement>) => {
        setDestination(event.target.value)
    }
    const onChangeImg = (event: ChangeEvent<HTMLInputElement>) => {
        setImg(event.target.value)
    }
    const onChangeMatchDetails = (event: ChangeEvent<HTMLInputElement>) => {
        setMatchDetails(event.target.value)
    }
    const onChangeMatchDate = (event: ChangeEvent<HTMLInputElement>) => {
        setMatchDate(event.target.value)
    }
    const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value)
    }
    const onChangeDescriptionCapacity = (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptionCapacity(event.target.value)
    }
    const onChangeDescriptionYearBuilt = (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptionYearBuilt(event.target.value)
    }
    const onChangeDescriptionConstructionCost = (event: ChangeEvent<HTMLInputElement>) => {
        setDescriptionConstructionCost(event.target.value)
    }

    const onClickEditStadium = async () => {
        if (stadiumName == '' || destination == '' || img == '' || matchDate == '' || matchDetails == '' || price == '' ||
            descriptionCapacity == '' || descriptionYearBuilt == '' || descriptionConstructionCost == '') {
            setErrorMessage("All fields must be filled");
        }
        else {
            const stadium = {
                id, stadiumName, destination, img, matchDate, matchDetails, price, descriptionCapacity, descriptionYearBuilt, descriptionConstructionCost
            }
            try {
                await axios.put<any>(`http://localhost:3001/stadiums/editStadium`, stadium);

                dispatch({ type: ActionType.EditStadium, payload: stadium });
                navigate('/');
            }
            catch (error) {
                console.log(error)
                alert("Failed to load resource")
            }
        }
    }

    const paperStyle = { padding: 20, height: '555px', width: 550, margin: "25px auto" }
    const avatarStyle = { backgroundColor: 'rgb(25 118 210)' }
    const btnstyle = { margin: '17px 0' }

    return (
        <div className="add-stadium" style={paperStyle}>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Edit Stadium
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="stadiumName"
                            label="Stadium Name"
                            fullWidth
                            variant="standard"
                            value={stadiumName}
                            onChange={onChangeStadiumName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="destination"
                            label="Destination"
                            fullWidth
                            variant="standard"
                            value={destination}
                            onChange={onChangeDestination}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="imgUrl"
                            label="Image URL"
                            fullWidth
                            variant="standard"
                            value={img}
                            onChange={onChangeImg}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="matchDetails"
                            label="Match Details"
                            fullWidth
                            variant="standard"
                            value={matchDetails}
                            onChange={onChangeMatchDetails}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="matchdate"
                            label="Match Date"
                            fullWidth
                            variant="standard"
                            value={matchDate}
                            onChange={onChangeMatchDate}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="price"
                            label="Price"
                            fullWidth
                            variant="standard"
                            value={price}
                            onChange={onChangePrice}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="descriptionCapacity"
                            label="Stadium Capacity"
                            fullWidth
                            variant="standard"
                            value={descriptionCapacity}
                            onChange={onChangeDescriptionCapacity}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="descriptionYearBuilt"
                            label="Year Built"
                            fullWidth
                            variant="standard"
                            value={descriptionYearBuilt}
                            onChange={onChangeDescriptionYearBuilt}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="descriptionConstructionCost"
                            label="Construction Cost"
                            fullWidth
                            variant="standard"
                            value={descriptionConstructionCost}
                            onChange={onChangeDescriptionConstructionCost}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <p className="error-p"> {errorMessage} </p>
                        <Button variant="contained" disableElevation onClick={onClickEditStadium}>
                            Save Edited Stadium
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        </div>
    )
}
