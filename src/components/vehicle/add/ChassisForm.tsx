import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const ChassisForm = () => {
    const {register} = useFormContext();
    const registerChassisInput = (name: string, props: any) => register(`chassisSetup.${name}`, props)
   return <>
        <h4>Chassis:</h4>
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <label htmlFor="preload" className='text-start'>Preload:</label>
                        <Form.Control type="number" {...registerChassisInput("preload", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="rearSteer" className='text-start'>Rear Steer:</label>
                        <Form.Control type="number" {...registerChassisInput("rearSteer", { required: true })} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="frontCrossmemberHeight" className='text-start'>Front Crossmember Height (cm):</label>
                        <Form.Control type="number" {...registerChassisInput("frontCrossmemberHeight", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="rearCrossmemberHeight" className='text-start'>Rear Crossmember Height (cm);</label>
                        <Form.Control type="number" {...registerChassisInput("rearCrossmemberHeight", { required: true })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="frontSpread" className='text-start'>Front Spread:</label>
                        <Form.Control type="number" {...registerChassisInput("frontSpread", { required: true })} />
                    </Col>
                    <Col>
                        <label htmlFor="rearSpread" className='text-start'>Rear Spread:</label>
                        <Form.Control type="number" {...registerChassisInput("rearSpread", { required: true })} />
                    </Col>
                    <Col xs={1} />
                </Row>
            </Card.Body>
        </Card>
    </>
}
