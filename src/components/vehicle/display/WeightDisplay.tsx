import { Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const WeightDisplay = ({ weight }: Vehicle) => {
    const {
        frontLeft,
        frontRight,
        rearLeft,
        rearRight,
        additional
    } = weight
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {Fieldset(frontLeft, "Front Left", "frontLeft")}
                    </Col>
                    <Col>
                        {Fieldset(frontRight, "Front Right", "frontRight")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(rearLeft, "Rear Left", "rearLeft")}
                    </Col>
                    <Col>
                        {Fieldset(rearRight, "Rear Right", "rearRight")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(additional, "Additional Weight", "additional")}
                    </Col>
                    <Col xs={6}/>
                </Row>
            </FormGroup>
        </Container>
    </>
}