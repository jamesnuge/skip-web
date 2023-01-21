import { useState, useEffect } from 'react'
import { resultApi } from './resultApi'
import { Location } from '../location/Location'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { ChassisSetup } from '../chassis/Chassis'
import { RaceResultListDisplay } from './RaceResultListDisplay'

export interface Result {
    id: number,
    datetime: string,
    location: Location,
    chassisSetup: ChassisSetup,
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
        <h2>All Race Results</h2>
        <Button onClick={() => push('/add')}>Add result + </Button>
        <RaceResultListDisplay results={data}/>
    </div>
}