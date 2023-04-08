import { Col, Container, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const SuspensionDisplay = ({ suspension }: Vehicle) => {
    const {
        extensionFromTight,
        compressionFromTight,
        extensionHighSpeed,
        extensionLowSpeed,
        compressionHighSpeed,
        compressionLowSpeed,
        frontCanisterPressure,
        rearCanisterPressure
    } = suspension
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {Fieldset(extensionFromTight, "Extensions From Tight", "extensionFromTight")}
                    </Col>
                    <Col>
                        {Fieldset(compressionFromTight, "Compression From Tight", "compressionFromTight")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(extensionHighSpeed, "Extension High Speed", "extensionHighSpeed")}
                    </Col>
                    <Col>
                        {Fieldset(extensionLowSpeed, "Extension Low Speed", "extensionLowSpeed")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(compressionHighSpeed, "Compression High Speed", "compressionHighSpeed")}
                    </Col>
                    <Col>
                        {Fieldset(compressionLowSpeed, "Compression Low Speed", "compressionLowSpeed")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(frontCanisterPressure, "Front Canister Pressure", "frontCanisterPressure")}
                    </Col>
                    <Col>
                        {Fieldset(rearCanisterPressure, "Rear Canister Pressure", "rearCanisterPressure")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    </>
}