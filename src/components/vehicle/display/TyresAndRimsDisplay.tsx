import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const TyresAndRimsDisplay = ({ tyresAndRims }: Vehicle) => {
    const {
        brand,
        size,
        pressure
    } = tyresAndRims
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {Fieldset(brand, "Brand", "brand")}
                    </Col>
                    <Col>
                        {Fieldset(size, "Size", "size")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(pressure, "Pressure", "pressure")}
                    </Col>
                    <Col xs={6}/>
                </Row>
            </FormGroup>
        </Container>
    </>
}