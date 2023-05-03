import { ReactNode, useEffect, useState } from 'react'
import { Vehicle } from '../Vehicle'
import { useHistory, useParams } from 'react-router-dom'
import { vehicleApi } from '../vehicleApi';
import { Container, Form, InputGroup, Row, Tab, Tabs } from 'react-bootstrap';
import { ChassisSetupDisplay } from './ChassisSetupDisplay';
import { ClutchDisplay } from './ClutchDisplay';
import { ConverterDisplay } from './ConverterDisplay';
import { SuspensionDisplay } from './SuspensionDisplay';
import { TransmissionDisplay } from './TransmissionDisplay';
import { WeightDisplay } from './WeightDisplay';
import { TyresAndRimsDisplay } from './TyresAndRimsDisplay';
import { WheelieBarsDisplay } from './WheelieBarsDisplay';
import './VehicleDisplay.css'
import { ChassisForm } from '../add/ChassisForm';
import { ClutchForm } from '../add/ClutchForm';
import { ConverterForm } from '../add/ConverterForm';
import { SuspensionForm } from '../add/SuspensionForm';
import { TransmissionForm } from '../add/TransmissionForm';
import { WeightForm } from '../add/WeightForm';
import { TyresAndRimsForm } from '../add/TyresAndRimsForm';
import { WheelieBarsForm } from '../add/WheelieBarForm';
import { StartLineForm } from '../add/StartLineForm';
import { resultApi } from '../../results/resultApi';
import { ResultVehicleConfig, VehicleResults } from '../../results/Results';

export interface VehicleDisplayParams {
    id: string | undefined;
}

interface TabConfiguration {
    key: string,
    title: string,
    node: (vehicle: Vehicle, readOnly: boolean) => ReactNode
}

const tabList: TabConfiguration[] = [
    {
        key: "chassis",
        title: "Chassis",
        node: ChassisSetupDisplay
    },
    {
        key: "clutch",
        title: "Clutch",
        node: ClutchDisplay
    },
    {
        key: "converter",
        title: "Converter",
        node: ConverterDisplay
    },
    {
        key: "suspension",
        title: "Suspension",
        node: SuspensionDisplay
    },
    {
        key: "transmission",
        title: "Transmission",
        node: TransmissionDisplay
    },
    {
        key: "weight",
        title: "Weight",
        node: WeightDisplay
    },
    {
        key: "tyres",
        title: "Tyres and Rims",
        node: TyresAndRimsDisplay
    },
    {
        key: "wheelieBars",
        title: "Wheelie Bars",
        node: WheelieBarsDisplay
    }
]



export const VehicleDisplay = () => {
    const [vehicle, setVehicle] = useState<Vehicle>();
    const {push} = useHistory();
    const maybeId = useParams<VehicleDisplayParams>().id
    if (maybeId === undefined) {
        console.error("Cannot load vehicle display without an ID")
        push("../")
    } 
    const id = parseInt(maybeId!)
    const fetchVehicle = async () => {
        const response = await vehicleApi.get(id)
        setVehicle(response)
    }
    useEffect(() => {
        fetchVehicle();
    })
    return <>
        {!vehicle ? "Loading..." :
            <Container>
                <h3 className="vehicle-name">{vehicle.name}</h3>
                <Tabs className="mb-3">
                    {tabList.map(({ key, title, node }) => <Tab eventKey={key} title={title}>
                        {node(vehicle!, true)}
                    </Tab>)}
                </Tabs>
                <br/>
                <br/>
                <Row>
                    <VehicleResults vehicleId={vehicle.id} limit={10}/>
                </Row>
            </Container>
        }
    </>
}

export const ResultVehicleConfigDisplay = ({id}: any) => {
    const [vehicle, setVehicle] = useState<ResultVehicleConfig>();
    const fetchVehicle = async () => {
        const response = await resultApi.getVehicleConfig(id)
        setVehicle(response)
    }
    useEffect(() => {
        fetchVehicle();
    });
    return <>
        {!vehicle ? "Loading..." :
            <>
                <Tabs className="mb-3">
                    {tabList.map(({ key, title, node }) => <Tab eventKey={key} key={key} title={title}>
                        {node(vehicle as any, true)}
                    </Tab>)}
                </Tabs>
            </>
        }
    </>
}

export interface VehicleModalDisplayProps {
    id: number
}

const formTabList: TabConfiguration[] = [
    {
        key: "startLine",
        title: "Start Line",
        node: StartLineForm
    },
    {
        key: "tyres",
        title: "Tyres and Rims",
        node: TyresAndRimsForm
    },
    {
        key: "chassis",
        title: "Chassis",
        node: ChassisForm
    },
    {
        key: "clutch",
        title: "Clutch",
        node: ClutchForm
    },
    {
        key: "converter",
        title: "Converter",
        node: ConverterForm
    },
    {
        key: "suspension",
        title: "Suspension",
        node: SuspensionForm
    },
    {
        key: "transmission",
        title: "Transmission",
        node: TransmissionForm
    },
    {
        key: "weight",
        title: "Weight",
        node: WeightForm
    },
    {
        key: "wheelieBars",
        title: "Wheelie Bars",
        node: WheelieBarsForm
    }
]
export const VehicleModalForm = ({id}: VehicleModalDisplayProps) => {
    const [vehicle, setVehicle] = useState<Vehicle>();
    const fetchVehicle = async () => {
        const response = await vehicleApi.get(id)
        setVehicle(response)
    }
    useEffect(() => {
        fetchVehicle();
    })
    return <>
        {!vehicle ? "Loading..." :
            <>
                <h3 className="vehicle-name">{vehicle.name}</h3>
                <Tabs className="mb-3">
                    {formTabList.map(({ key, title, node }) => <Tab key={key} eventKey={key} title={title}>
                        {node(vehicle!, true)}
                    </Tab>)}
                </Tabs>
            </>
        }
    </>
}

export const Fieldset = (value: any, title: string, name: string, readOnly: boolean = true, className: string = "text-right") => {
    return <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">{title}</InputGroup.Text>
        <Form.Control className={className}
            readOnly={readOnly}
            value={value}
            onChange={console.log}
            aria-label="Title"
            aria-describedby="basic-addon1"
        />
    </InputGroup>
}