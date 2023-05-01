import { useState, useEffect } from 'react'
import { resultApi } from './resultApi'
import { RaceResultListDisplay } from './RaceResultListDisplay'
import {Clutch, Converter, Suspension, Transmission, TyresAndRims, Vehicle, Weight, WheelieBars} from "../vehicle/Vehicle";
import { ChassisSetup } from '../chassis/Chassis'

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

export interface ResultVehicleConfig {
    chassisSetup: ChassisSetup;
    clutch: Clutch;
    suspension: Suspension,
    converter: Converter,
    transmission: Transmission,
    weight: Weight,
    tyresAndRims: TyresAndRims,
    wheelieBars: WheelieBars
}