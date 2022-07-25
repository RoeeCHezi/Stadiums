import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import './AddNewStadium.css'
import { Button } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';


function AddNewStadium() {

    const navigate = useNavigate();

    const [stadiumName, setStadiumName] = useState("");
    const [destination, setDestination] = useState("");
    const [img, setImg] = useState("");
    const [matchDetails, setMatchDetails] = useState("");
    const [matchDate, setMatchDate] = useState("");
    const [price, setPrice] = useState("");
    const [descriptionCapacity, setDescriptionCapacity] = useState("");
    const [descriptionYearBuilt, setDescriptionYearBuilt] = useState("");
    const [descriptionConstructionCost, setDescriptionConstructionCost] = useState("");    

    const [errorMessage, setErrorMessage] = useState("");

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


    const onClickAddNew = async () => {
        if (stadiumName == '' || destination == '' || img == '' || matchDetails == '' || matchDate == '' || price == '' || 
            descriptionCapacity == '' || descriptionYearBuilt == '' || descriptionConstructionCost == '') {
            setErrorMessage("All fields must be filled");
        }
        else {
            const stadium = {
                likes: 0, stadiumName, destination, img, matchDetails, matchDate, price, descriptionCapacity, descriptionYearBuilt, descriptionConstructionCost
            }
            try {
                await axios.post('http://localhost:3001/stadiums', stadium);
                navigate('/');
                window.location.reload();

            } catch (error) {
                console.log(error)
                alert("Failed to load resource")
            }
        }
    }
    
    const paperStyle = { padding: 20, height: '550px', width: 500, margin: "15px auto" }

    return (
        <div className="add-stadium" style={paperStyle}>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Add New Stadium
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="stadiumName"
                            label="Stadium Name"
                            fullWidth
                            variant="standard"
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
                            onChange={onChangeImg}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="matchDetails"
                            label="Match Details"
                            fullWidth
                            variant="standard"
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
                            onChange={onChangeDescriptionConstructionCost}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <p className="error-p"> {errorMessage} </p>
                        <Button variant="contained" disableElevation onClick={onClickAddNew}>
                            Save Stadium
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        </div>
    );
}




export default AddNewStadium;