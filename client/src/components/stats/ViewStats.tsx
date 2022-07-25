import './ViewStats.css'
import { Chart } from "react-google-charts";
import axios from 'axios';
import { AppState } from '../../redux/app-state';
import { ActionType } from '../../redux/action-type';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';



export default function ViewStats() {
    const { likedStadiumsForStats, user } = useSelector((state: AppState) => state)
    const dispatch = useDispatch();
    useEffect(() => {
        getAllLikesStatsForChart();
    }, [user]);

    const getAllLikesStatsForChart = async () => {
        const response = await axios.get("http://localhost:3001/stadiums");
        console.log(response.data);
        let likesList = response.data;
        dispatch({
            type: ActionType.GetLikesStats,
            payload: likesList,
        });
    }

    const data = [["stadiumName", "Likes"]];
    likedStadiumsForStats.map((like: any) =>
        data.push([like.stadiumName, like.likes])
    );

    const options = {
        chart: {
            title: "Most Liked Stadiums",
            subtitle: "By Number of Likes",
        },
    };



    return (
        <div className="Stats">
            <Chart style={{ width: "1200px", height: "500px" }}
                className="text-center ss"
                chartType="Bar"
                data={data}
                options={options}
            />
        </div>
    )
}
