import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const ClutchForm = () => {
    const {register} = useFormContext();
    const registerClutchInput = (name: string, props: any) => register(`clutch.${name}`, props)
   return <>
    <h4>Clutch:</h4>
    <Card>
        <Card.Body>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="primaryWeight" className='text-start'>Primary Weight:</label>
                    <Form.Control type="number" {...registerClutchInput("primaryWeight", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="secondaryWeight" className='text-start'>Secondary Weight:</label>
                    <Form.Control type="number" {...registerClutchInput("secondaryWeight", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="baseTurns" className='text-start'>Base Turns:</label>
                    <Form.Control type="number" {...registerClutchInput("baseTurns", { required: true })} />
                </Col>
                <Col xs={1} />
            </Row>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="hardness" className='text-start'>Hardness:</label>
                    <Form.Control type="number" {...registerClutchInput("hardness", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="lockUpActivated" className='text-start'>Lock Up Activated:</label>
                    <Form.Check type="switch" id="custom-switch" {...registerClutchInput("lockUpActivated", { required: true })}/>
                </Col>
                <Col>
                    <label htmlFor="locked" className='text-start'>Locked:</label>
                    <Form.Check type="switch" id="custom-switch" {...registerClutchInput("locked", { required: true })}/>
                </Col>
                <Col xs={1} />
            </Row>
        </Card.Body>
    </Card>
</>
}
