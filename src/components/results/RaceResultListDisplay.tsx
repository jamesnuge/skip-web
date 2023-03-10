import { Result } from './Results';
import { Location } from '../location/Location';
import { Col, Container, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { RaceRequest } from '../query/QueryRaceResults';
import { ChassisSetup } from '../chassis/Chassis';

export interface RaceResultListProps {
    results: Result[];
    request?: RaceRequest;
}

export const RaceResultListDisplay = ({results, request}: RaceResultListProps) => {
    return <Row>
        <table className="table table-striped tableFixHead thead-light">
            <thead className='thead-dark'>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Chassis Setup</th>
                    <th scope="col">Time<br /> (60", 330", 660", 1320")</th>
                    <th scope="col">Speed<br /> (660", 1320")</th>
                    <th scope="col">Trackmeter</th>
                    <th scope="col">Track Temp</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Humidity</th>
                    {request && <th scope="col">Rank</th>}
                </tr>
            </thead>
            <tbody>
                {results.length !== 0 &&
                    results.map(({ id, datetime, chassisSetup, sixSixtyFeetSpeed, quarterMileSpeed, sixtyFeetTime, threeThirtyFeetTime, sixSixtyFeetTime, quarterMileTime, location, trackTemperature, trackmeter, temperature, humidity, rank }) => <tr key={id}>
                        <td scope="col" className='text-start'>{datetime}</td>
                        {generateLocationCell(location)}
                        {generateChassisSetupCell(chassisSetup)}
                        <td scope="col" className='text-start'>{sixtyFeetTime}s, {threeThirtyFeetTime}s,  {sixSixtyFeetTime}s,  {quarterMileTime}s</td>
                        <td scope="col" className='text-start'>{sixSixtyFeetSpeed}mph {quarterMileSpeed}mph</td>
                        <td scope="col" className='text-start'>{trackmeter} {request && getDiffElement(trackmeter, request.trackmeter)}</td>
                        <td scope="col" className='text-start'>{trackTemperature}??C {request && getDiffElement(trackTemperature, request.trackTemperature)}</td>
                        <td scope="col" className='text-start'>{temperature}??C {request && getDiffElement(temperature, request.temperature)}</td>
                        <td scope="col" className='text-start'>{humidity}% {request && getDiffElement(humidity, request.humidity)}</td>
                        {request && <td scope="col" className='text-start'>{rank}</td>}
                    </tr>)
                }
            </tbody>
        </table>
    </Row>
}

const generateLocationCell = (location: Location) => {
    const popover = <Popover id={`popover-basic-${location.id}`}>
        <Popover.Header as="h3">{location.name}</Popover.Header>
        <Popover.Body>
            Altitude: {location.altitude}ft
        </Popover.Body>
    </Popover>
    return <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
        <td scope="col">
            {location.name}
        </td>
    </OverlayTrigger>
}

const generateChassisSetupCell = ({ id, name, frontCrossmemberHeight, rearCrossmemberHeight, frontSpread, rearSpread, rearSteer, preload }: ChassisSetup) => {
    const popover = <Popover id={`popover-basic-chassis-${id}`}>
        <Popover.Header as="h3">{name}</Popover.Header>
        <Popover.Body>
            <Container>
                <Row>
                    <Col>
                        Front Spread: {frontSpread} <br />
                    </Col>
                    <Col>
                        Rear Spread: {rearSpread} <br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        FCH: {frontCrossmemberHeight} <br />
                    </Col>
                    <Col>
                        RCH:  {rearCrossmemberHeight} <br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Rear Steer: {rearSteer} <br />
                    </Col>
                    <Col>
                        Preload: {preload} <br />
                    </Col>
                </Row>
            </Container>
        </Popover.Body>
    </Popover>;

    return <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
        <td scope="col" className="text-start">
            {name}
        </td>
    </OverlayTrigger>;
}

const getDiffElement = (a: number, b: number) => {
    return a && <span className='text-danger'>(??{Math.abs(a - b)})</span>;
}