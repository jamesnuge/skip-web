import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const EngineDisplay = ({ engine }: Vehicle) => {
    const {
        stroke,
        bore,
        brand,
        cubicInch
    } = engine!!
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {brand && Fieldset(brand!!, "Brand", "brand")}
                    </Col>
                    <Col>
                        {cubicInch && Fieldset(cubicInch!!, "Cubic Inch", "cubicInch")}
                    </Col>
                    </Row>
                <Row>
                    <Col>
                        {bore && Fieldset(bore!!, "Bore", "bore")}
                    </Col>
                    <Col>
                        {stroke && Fieldset(stroke!!, "Stroke", "stroke")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    </>
}