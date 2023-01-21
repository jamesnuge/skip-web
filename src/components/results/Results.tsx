import { useState, useEffect } from 'react'
import { resultApi } from './resultApi'
import { Location } from '../location/Location'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export interface Result {
    datetime: string,
    location: Location,
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
        <table className="table table-striped tableFixHead thead-light">
            <thead className='thead-dark'>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Altitude</th>
                    <th scope="col">Time<br /> (60", 330", 660", 1320")</th>
                    <th scope="col">Speed<br /> (660", 1320")</th>
                    <th scope="col">Trackmeter</th>
                    <th scope="col">Track Temp</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Humidity</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ datetime, sixSixtyFeetSpeed, quarterMileSpeed, sixtyFeetTime, threeThirtyFeetTime, sixSixtyFeetTime, quarterMileTime, location, trackTemperature, trackmeter, temperature, humidity}) => <tr>
                    <td scope="col" className='text-start'>{datetime}</td>
                    <td scope="col" className='text-start'>{location.name}</td>
                    <td scope="col" className='text-start'>{location.altitude}ft</td>
                    <td scope="col" className='text-start'>{sixtyFeetTime}s, {threeThirtyFeetTime}s,  {sixSixtyFeetTime}s,  {quarterMileTime}s</td>
                    <td scope="col" className='text-start'>{sixSixtyFeetSpeed}mph {quarterMileSpeed}mph</td>
                    <td scope="col" className='text-start'>{trackmeter}</td>
                    <td scope="col" className='text-start'>{trackTemperature}°C</td>
                    <td scope="col" className='text-start'>{temperature}°C</td>
                    <td scope="col" className='text-start'>{humidity}%</td>
                </tr>)
                }
            </tbody>
        </table>
    </div>
}