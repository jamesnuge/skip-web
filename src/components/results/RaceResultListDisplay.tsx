import { Result } from './Results';
import { Button, Modal, Row } from 'react-bootstrap';
import { RaceRequest } from '../query/QueryRaceResults';
import { useState } from 'react';
import { ResultVehicleConfigDisplay } from '../vehicle/display/VehicleDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faGears } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { resultApi } from './resultApi';

export interface RaceResultListProps {
    results: Result[];
    request?: RaceRequest;
    refresh: () => void;
}

export const RaceResultListDisplay = ({results, request, refresh}: RaceResultListProps) => {
    const [show, setShow] = useState(false);
    const [showTuneupModal, setShowTuneupModal] = useState(false);
    const [resultId, setResultId] = useState<number | undefined>(undefined)
    const [selectedResult, setSelectedResult] = useState<string | undefined>(undefined)
    const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined)
    const [vehicleName, setVehicleName] = useState<string | undefined>(undefined)
    const {handleSubmit, register} = useForm();

    const handleClose = () => setShow(false);

    const handleShow = (id: number, name: string, date: string, location: string) => {
        setResultId(id);
        setVehicleName(name);
        setSelectedResult(date);
        setSelectedLocation(location);
        setShow(true);
    }

    const handleTuneupModalClose = () => setShowTuneupModal(false)
    const handleShowTuneupModal = (id: number) => {
        setResultId(id)
        setShowTuneupModal(true)
    }

    const saveTuneupFile = async (formResult: any) => {
        await resultApi.addTuneupFile({
            resultId: resultId!!,
            tuneupFile: formResult.tuneupFile as string
        })
        refresh();
        setShowTuneupModal(false);
        setResultId(undefined);
    }


    return <Row>
                <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {vehicleName} Configuration<br/>
            For result {selectedResult} <br/>
            at {selectedLocation}
            </Modal.Title>
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
      <Modal show={showTuneupModal} onHide={handleTuneupModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add tuneup file
          </Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <form>
                    <label htmlFor="tuneupFile" className='text-start'>Filename:</label>
                    <input id="temperature" className='form-control' type="string" {...register("tuneupFile", { required: true })} placeholder="Tuneup File" />
                </form>
            </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleSubmit(saveTuneupFile)}>
                Save
            </Button>
          <Button variant="secondary" onClick={handleTuneupModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <table className="table table-striped tableFixHead thead-light">
            <thead className='thead-dark'>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Vehicle</th>
                    <th scope="col">Tuneup file</th>
                    <th scope="col">Time<br /> (60", 330", 660", 1320")</th>
                    <th scope="col">Speed<br /> (660", 1320")</th>
                    <th scope="col">Trackmeter</th>
                    <th scope="col">Track Temp</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Humidity</th>
                    <th scope="col">View Config</th>
                    {request && <th scope="col">Rank</th>}
                </tr>
            </thead>
            <tbody>
                {results.length !== 0 &&
                    results.map(({ id, datetime, vehicle, tuneupFile, sixSixtyFeetSpeed, quarterMileSpeed, sixtyFeetTime, threeThirtyFeetTime, sixSixtyFeetTime, quarterMileTime, location, trackTemperature, trackmeter, temperature, humidity, rank }) => <tr key={id}>
                        {generateDateCell(datetime)}
                        <td className='text-start'>{location}</td>
                        <td className='text-start'>{vehicle}</td>
                        {tuneupCell(tuneupFile, () => handleShowTuneupModal(id))}
                        <td className='text-start'>{sixtyFeetTime}s, {threeThirtyFeetTime}s,  {sixSixtyFeetTime}s,  {quarterMileTime}s</td>
                        <td className='text-start'>{sixSixtyFeetSpeed}mph {quarterMileSpeed}mph</td>
                        <td className='text-start'>{trackmeter} {request && getDiffElement(trackmeter, request.trackmeter)}</td>
                        <td className='text-start'>{trackTemperature}°C {request && getDiffElement(trackTemperature, request.trackTemperature)}</td>
                        <td className='text-start'>{temperature}°C {request && getDiffElement(temperature, request.temperature)}</td>
                        <td className='text-start'>{humidity}% {request && getDiffElement(humidity, request.humidity)}</td>
                        <td><FontAwesomeIcon icon={faGears} onClick={() => handleShow(id, vehicle, new Date(datetime).toDateString() + " " + new Date(datetime).toTimeString().slice(0, 8), location)}/></td>
                        {request && <td className='text-start'>{rank}</td>}
                    </tr>)
                }
            </tbody>
        </table>
    </Row>
}

const generateDateCell = (val: string) => {
    const date = new Date(val)
    return <td className="text-start">{date.toDateString()}<br/>{date.toTimeString().slice(0, 8)}</td>
}

const getDiffElement = (a: number, b: number) => {
    return a && <span className='text-danger'>(±{Math.abs(a - b)})</span>;
}

const tuneupCell = (tuneupFile: string | undefined, openModal: any) => {
    return !tuneupFile ? <td><span onClick={openModal}>
         Add <FontAwesomeIcon icon={faFileCirclePlus} />
    </span></td> : <td><code>{tuneupFile}</code></td>
}