import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState, defaultUser } from "./app-state";


let initialAppState = new AppState();

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState = initialAppState, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.deleteStadium:
            let stadiumId = action.payload;
            newAppState.allStadiumsArray = oldAppState.allStadiumsArray.filter(stadium => stadium.id != stadiumId);
            break;

        case ActionType.AddStadium:
            let tempStadiumArrayToAdd = [...oldAppState.allStadiumsArray];
            tempStadiumArrayToAdd.push(action.payload);
            newAppState.allStadiumsArray = tempStadiumArrayToAdd;
            break;

        case ActionType.EditStadium:
            newAppState.allStadiumsArray = newAppState.allStadiumsArray.map(stadium => {
                if (stadium.id == action.payload.id) {
                    stadium = action.payload
                }
                return stadium;
            });
            break;

        case ActionType.GetAllStadiums:
            newAppState.allStadiumsArray = action.payload;
            break;

        case ActionType.AddLike:
            let stadiumLikedId = action.payload
            let index = oldAppState.allStadiumsArray.findIndex((stadium) => stadium.id == stadiumLikedId);
            newAppState.allStadiumsArray[index].likes = newAppState.allStadiumsArray[index].likes + 1;
            newAppState.user.likedStadiums = oldAppState.user.likedStadiums.add(action.payload);
            break;

        case ActionType.RemoveLike:
            let stadiumUnlikedId = action.payload
            let indexUnLiked = oldAppState.allStadiumsArray.findIndex((stadium) => stadium.id == stadiumUnlikedId);
            newAppState.allStadiumsArray[indexUnLiked].likes = newAppState.allStadiumsArray[indexUnLiked].likes - 1;
            newAppState.user.likedStadiums.delete(action.payload);
            break;

        case ActionType.UpdateLikes:
            newAppState.user.likedStadiums = action.payload;
            break;

        case ActionType.SortStadiums:
            oldAppState.allStadiumsArray.sort((stadiumA, stadiumB) => {
                if (oldAppState.user.likedStadiums.has(stadiumA.id)) {
                    return -1;
                }
                if (oldAppState.user.likedStadiums.has(stadiumB.id)) {
                    return 1;
                }
                return 0;
            });
            newAppState.allStadiumsArray = [...oldAppState.allStadiumsArray];
            break;


        case ActionType.LoginUser:
            newAppState.user = action.payload;
            break;

        case ActionType.Logout:
            newAppState.user = defaultUser;
            break;

        case ActionType.GetLikesStats:
            newAppState.likedStadiumsForStats = action.payload;
            break;

    }

    return newAppState;
}