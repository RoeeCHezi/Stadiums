import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import { IStadiums } from "../Models/IStadiums";
import StadiumCard from "../stadiumcard/StadiumCard";
import WelcomeTitle from "../welcometitle/WelcomeTitle";
import './StadiumContainer.css';

export default function StadiumContainer(): JSX.Element {

    const allStadiumsArray = useSelector((state: AppState) => state.allStadiumsArray);

    return (
        <div>
            <WelcomeTitle />

            <div className="stadium-container">

                {allStadiumsArray.map((stadium: IStadiums, index: number) =>
                (<StadiumCard key={index} id={stadium.id} likes={stadium.likes} destination={stadium.destination} stadiumName={stadium.stadiumName}
                    price={stadium.price} matchDate={stadium.matchDate} img={stadium.img} matchDetails={stadium.matchDetails} stadiumDescriptionCapacity={stadium.stadiumDescriptionCapacity}
                    stadiumDescriptionYearBuilt={stadium.stadiumDescriptionYearBuilt} stadiumDescriptionConstCost={stadium.stadiumDescriptionConstCost} />))}
            </div>
        </div>
    )
}
