import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const EngineDisplay = ({ engine }: Vehicle) => {
    return <>
        {engine && <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {engine!.brand && Fieldset(engine.brand!!, "Brand", "brand")}
                    </Col>
                    <Col>
                        {engine!.cubicInch && Fieldset(engine.cubicInch!!, "Cubic Inch", "cubicInch")}
                    </Col>
                    </Row>
                <Row>
                    <Col>
                        {engine!.bore && Fieldset(engine.bore!!, "Bore", "bore")}
                    </Col>
                    <Col>
                        {engine!.stroke && Fieldset(engine.stroke!!, "Stroke", "stroke")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>}
    </>
}