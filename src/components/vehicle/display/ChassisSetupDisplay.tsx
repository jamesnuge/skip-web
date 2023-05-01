import { Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const ChassisSetupDisplay = ({ chassisSetup }: Vehicle, readOnly: boolean) => {
    const { frontSpread, rearSpread, frontCrossmemberHeight, rearCrossmemberHeight, rearSteer, preload } = chassisSetup
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                     {Fieldset(frontSpread, "Front Spread", "frontSpread", readOnly)}
                    </Col>
                    <Col>
                     {Fieldset(rearSpread, "Rear Spread", "rearSpread", readOnly)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                     {Fieldset(frontCrossmemberHeight, "Front Crossmember Height", "frontCrossmemberHeight", readOnly)}
                    </Col>
                    <Col>
                     {Fieldset(rearCrossmemberHeight, "Rear Crossmember Height", "rearCrossmemberHeight", readOnly)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                     {Fieldset(rearSteer, "Rear Steer", "rearSteer", readOnly)}
                    </Col>
                    <Col>
                     {Fieldset(preload, "Preload", "preload", readOnly)}
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    </>
}