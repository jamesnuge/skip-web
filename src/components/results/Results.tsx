import { useState, useEffect } from 'react'
import { resultApi } from './resultApi'
import { Location } from '../location/Location'
import { useHistory } from 'react-router-dom'
import { RaceResultListDisplay } from './RaceResultListDisplay'
import {Clutch, Converter, Suspension, Transmission, TyresAndRims, Vehicle, Weight, WheelieBars} from "../vehicle/Vehicle";
import { ChassisSetup } from '../chassis/Chassis'
import { Button, Modal } from 'react-bootstrap'
import { ResultVehicleConfigDisplay } from '../vehicle/display/VehicleDisplay'

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
    const [show, setShow] = useState(false);
    const [resultId, setResultId] = useState<number | undefined>(undefined)

    const handleClose = () => setShow(false);
    const handleShow = (id: number) => {
        setResultId(id);
        setShow(true);
    }

    const handleFetchData = async () => {
        const response = await resultApi.getAll()
        setData(response)
    }
    useEffect(() => {
        handleFetchData()
    }, [])
    return <div>
        <h2>Results</h2>
        <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Change Tuneup</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                    <ResultVehicleConfigDisplay id={resultId as number} />
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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