import { Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const ChassisSetupDisplay = ({ chassisSetup }: Vehicle) => {
    const { name, frontSpread, rearSpread, frontCrossmemberHeight, rearCrossmemberHeight, rearSteer, preload } = chassisSetup
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col xs={6}>
                     {Fieldset(name, "Name", "name", "text-center")}
                    </Col>
                    <Col xs={6}/>
                </Row>
                <Row>
                    <Col>
                     {Fieldset(frontSpread, "Front Spread", "frontSpread")}
                    </Col>
                    <Col>
                     {Fieldset(rearSpread, "Rear Spread", "rearSpread")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                     {Fieldset(frontCrossmemberHeight, "Front Crossmember Height", "frontCrossmemberHeight")}
                    </Col>
                    <Col>
                     {Fieldset(rearCrossmemberHeight, "Rear Crossmember Height", "rearCrossmemberHeight")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                     {Fieldset(rearSteer, "Rear Steer", "rearSteer")}
                    </Col>
                    <Col>
                     {Fieldset(preload, "Preload", "preload")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    </>
}