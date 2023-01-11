import { useState, useEffect } from 'react'
import { resultApi } from './resultApi'

export const Dashboard = () => {
    const [data, setData] = useState([])
    const handleFetchData = async () => {
        const response = await resultApi.getAll()
        console.log(response) 
        setData(response)
    }
    useEffect(() => {
        handleFetchData()
    }, [])
    return <div>
        <h2>All Race Results</h2>
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
                {data.map(({ datetime, altitude, sixSixtyFeetSpeed, quarterMileSpeed, sixtyFeetTime, threeThirtyFeetTime, sixSixtyFeetTime, quarterMileTime, location, trackTemperature, trackmeter, temperature, humidity}) => <tr>
                    <td scope="col" className='text-start'>{datetime}</td>
                    <td scope="col" className='text-start'>{location}</td>
                    <td scope="col" className='text-start'>{altitude}ft</td>
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