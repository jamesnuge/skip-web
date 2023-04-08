import { Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const TransmissionDisplay = ({ transmission }: Vehicle) => {
    const {
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
    rearGear
    } = transmission
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {Fieldset(first, "First Gear", "first")}
                    </Col>
                    <Col>
                        {Fieldset(second, "Second Gear", "second")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(third, "Third Gear", "third")}
                    </Col>
                    <Col>
                        {Fieldset(fourth, "Fourth Gear", "fourth")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(fifth, "Fifth Gear", "fifth")}
                    </Col>
                    <Col>
                        {Fieldset(sixth, "Sixth Gear", "sixth")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(seventh, "Seventh Gear", "seventh")}
                    </Col>
                    <Col>
                        {Fieldset(rearGear, "Rear Gear", "rearGear")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    </>
}