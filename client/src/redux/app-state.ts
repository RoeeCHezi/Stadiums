import { IUser } from "../components/Models/IUsers";
import { IStadiums } from "../components/Models/IStadiums";
import { UserType } from "../components/Models/user-type";

export const defaultUser: IUser = {
    userId: 0,
    userType: UserType.guest,
    firstName: "Guest",
    lastName: "",
    // userName: "",
    // password: "",
    likedStadiums: new Set()
}

export class AppState {
    public allStadiumsArray: IStadiums[] = []
    
    public likedStadiumsForStats: object[] = [];

    public user: IUser = defaultUser;
}