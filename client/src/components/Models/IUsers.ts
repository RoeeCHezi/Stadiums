import { StringifyOptions } from "querystring";
import { UserType } from "./user-type";


export interface IUser {
    userType: UserType;
    userId: number;
    firstName: string;
    lastName: string;
    likedStadiums: Set<number>;
 }