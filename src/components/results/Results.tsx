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
        <table className="table">
            <thead className='thead-dark'>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Location</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Humidity</th>
                </tr>
            </thead>
            <tbody>
                { data.map(({datetime, result, location, temperature, humidity}) => <tr>
                    <th scope="col">{datetime}</th>
                    <th scope="col">{result}s</th>
                    <th scope="col">{location}</th>
                    <th scope="col">{temperature}°C</th>
                    <th scope="col">{humidity}%</th>
                </tr>)
                }
            </tbody>
        </table>
    </div>
}