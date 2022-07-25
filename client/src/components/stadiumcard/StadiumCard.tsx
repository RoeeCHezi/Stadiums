import { IStadiums } from "../Models/IStadiums";
import './StadiumCard.css'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UserType } from "../Models/user-type";
import { AppState } from "../../redux/app-state";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ActionType } from "../../redux/action-type";
import { useNavigate } from "react-router";



interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard(props: IStadiums) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteStadium = async () => {
        dispatch({ type: ActionType.deleteStadium, payload: props.id });

        try {
            await axios.delete<any>(`http://localhost:3001/stadiums/delete?id=${props.id}`);
        }
        catch (error) {
            console.log(error)
            alert("Failed to load resource")
        }
    }

    let editStadium = () => {
        navigate(`/EditStadium/${props.id}`);
    }
    const user = useSelector((state: AppState) => state.user);

    const isUser = user.userType == UserType.user;
    const isAdmin = user.userType == UserType.admin;
    const isGuest = user.userType == UserType.guest;

    
    const likedStadiumClicked = async () => {
        try {
            if (!isliked()) {
                await axios.post<any>(`http://localhost:3001/likes?userId=${user.userId}&stadiumId=${props.id}`);
                dispatch({ type: ActionType.AddLike, payload: props.id });
                dispatch({ type: ActionType.SortStadiums });
                let likes = Array.from(likedStadiums);
                sessionStorage.setItem('likedStadiums', JSON.stringify(likes));
            }
            else {
                dispatch({ type: ActionType.RemoveLike, payload: props.id });
                dispatch({ type: ActionType.SortStadiums });
                let likes = Array.from(likedStadiums);
                sessionStorage.setItem('likedStadiums', JSON.stringify(likes));
            }
        } catch (error) {
            console.log(error);
            alert("Failed to Load Resources")
        }
    }

    const likedStadiums = useSelector((state: AppState) => state.user.likedStadiums);

    const isliked = () => {
        let userLikedStadiums = user.likedStadiums;
        if (userLikedStadiums.size != 0) {
            if (userLikedStadiums.has(props.id)) {
                return true;
            }
        }
        return false;
    }
    return (
        <Card id="stadium-card">
            <CardHeader
                title={props.stadiumName}
                subheader={props.destination}
            />
            <CardMedia
                component="img"
                height="194"
                image={props.img}
                alt={props.stadiumName}
            />
            <CardContent>
                {!isGuest &&
                <Typography variant="body2" color="text.secondary">
                    Followers: {props.likes}
                </Typography>
                }
                <Typography variant="body2" color="text.secondary">
                    {props.matchDetails}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.matchDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: ${props.price}<br />
                </Typography>

            </CardContent>
            <CardActions disableSpacing>
                {isUser &&
                    <IconButton onClick={likedStadiumClicked} style={{ color: isliked() ? "red" : "" }} aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                }
                {isAdmin &&
                    <Tooltip title="Delete">
                        <IconButton onClick={deleteStadium}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                }
                {isAdmin &&
                    <Tooltip title="Edit">
                        <IconButton onClick={editStadium}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                }
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>About {props.stadiumName}</Typography>
                    <Typography paragraph>
                        Capacity: {props.stadiumDescriptionCapacity}<br />
                        Year Built: {props.stadiumDescriptionYearBuilt}<br />
                        Construction Cost: {props.stadiumDescriptionConstCost}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}







