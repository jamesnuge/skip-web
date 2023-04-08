import { Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const WheelieBarsDisplay = ({ wheelieBars }: Vehicle) => {
    const {
        length,
        height,
        stagger
    } = wheelieBars
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {Fieldset(length, "Length", "length")}
                    </Col>
                    <Col>
                        {Fieldset(height, "Height", "height")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(stagger, "Stagger", "stagger")}
                    </Col>
                    <Col xs={6}/>
                </Row>
            </FormGroup>
        </Container>
    </>
}
