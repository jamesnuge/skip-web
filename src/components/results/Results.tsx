import { useState, useEffect } from 'react'
import { resultApi } from './resultApi'
import { useParams } from 'react-router-dom'
import { RaceResultListDisplay } from './RaceResultListDisplay'
import { Clutch, Converter, Suspension, Transmission, TyresAndRims, Weight, WheelieBars } from "../vehicle/Vehicle";
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
    tuneupFile: string | undefined,
    rank: number,
    extraFields: ExtraFieldDto
}

export type ExtraField = {field: string, displayName: string, value: any}
export type ExtraFieldDto = {[id:string]: ExtraField}

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
        <RaceResultListDisplay results={data} refresh={() => handleFetchData()}/>
    </div>
}

export const VehicleResultDisplay = () => {
    const vehicleId = useParams<any>().vehicleId
    return <VehicleResults vehicleId={vehicleId}/>
}

export const VehicleResults = ({vehicleId, limit}: any) => {
    const [data, setData] = useState<Result[]>([])
    const handleFetchData = async () => {
        const response = await resultApi.getByVehicle(vehicleId)
        setData(limit !== undefined ? response.slice(0, limit) : response)
    }
    useEffect(() => {
        handleFetchData()
    }, [])
    return <div>
        <h3>Results</h3>
        <RaceResultListDisplay results={data} refresh={() => handleFetchData()}/>
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