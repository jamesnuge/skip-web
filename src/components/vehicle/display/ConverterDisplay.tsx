import { Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const ConverterDisplay = ({ converter }: Vehicle) => {
    const {
        pumpSize,
        stator
    } = converter
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {Fieldset(pumpSize, "Pump Size", "pumpSize")}
                    </Col>
                    <Col>
                        {Fieldset(stator, "Stator", "stator")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    </>
}