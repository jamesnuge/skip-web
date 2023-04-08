import { ReactNode, useEffect, useState } from 'react'
import { Vehicle } from '../Vehicle'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { vehicleApi } from '../vehicleApi';
import { Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { ChassisSetupDisplay } from './ChassisSetupDisplay';
import { ClutchDisplay } from './ClutchDisplay';
import { ConverterDisplay } from './ConverterDisplay';
import { SuspensionDisplay } from './SuspensionDisplay';
import { TransmissionDisplay } from './TransmissionDisplay';
import { WeightDisplay } from './WeightDisplay';
import { TyresAndRimsDisplay } from './TyresAndRimsDisplay';
import { WheelieBarsDisplay } from './WheelieBarsDisplay';
import './VehicleDisplay.css'

export interface VehicleDisplayParams {
    id: string | undefined;
}

interface TabConfiguration {
    key: string,
    title: string,
    node: (vehicle: Vehicle) => ReactNode
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
    }, [])
    return <>
        {!vehicle ? "Loading..." :
            <>
                <h3 className="vehicle-name">{vehicle.name}</h3>
                <Tabs className="mb-3">
                    {tabList.map(({ key, title, node }) => <Tab eventKey={key} title={title}>
                        {node(vehicle!)}
                    </Tab>)}
                </Tabs>
            </>
        }
    </>
}

export const Fieldset = (value: any, title: string, name: string, className: string = "text-right") => {
    return <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">{title}</InputGroup.Text>
        <Form.Control className={className}
            readOnly
            value={value}
            aria-label="Title"
            aria-describedby="basic-addon1"
        />
    </InputGroup>
}