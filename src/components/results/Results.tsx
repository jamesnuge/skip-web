import { useState, useEffect } from 'react'
import { resultApi } from './resultApi'
import { Location } from '../location/Location'
import { useHistory } from 'react-router-dom'
import { RaceResultListDisplay } from './RaceResultListDisplay'
import {Vehicle} from "../vehicle/Vehicle";

export interface Result {
    id: number,
    datetime: string,
    location: string,
    vehicle: string,
    sixtyFeetTime: number,
    threeThirtyFeetTime: number,
    sixSixtyFeetTime: number,
    quarterMileTime: number,
    sixSixtyFeetSpeed: number,
    quarterMileSpeed: number,
    trackmeter: number,
    temperature: number,
    trackTemperature: number,
    humidity: number,
    rank: number
}

export const Dashboard = () => {
    const [data, setData] = useState<Result[]>([])
    const {push} = useHistory();
    const handleFetchData = async () => {
        const response = await resultApi.getAll()
        setData(response)
    }
    useEffect(() => {
        handleFetchData()
    }, [])
    return <div>
        <h2>Results</h2>
        <RaceResultListDisplay results={data}/>
    </div>
}