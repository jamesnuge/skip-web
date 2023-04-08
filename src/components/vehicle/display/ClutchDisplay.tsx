import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const ClutchDisplay = ({ clutch }: Vehicle) => {
    const {
        primaryWeight,
        secondaryWeight,
        baseTurns,
        hardness,
        lockUpActivated,
        locked
    } = clutch
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {Fieldset(primaryWeight, "Primary Weight", "primaryWeight")}
                    </Col>
                    <Col>
                        {Fieldset(secondaryWeight, "Secondary Weight", "secondaryWeight")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(baseTurns, "Base Turns", "baseTurns")}
                    </Col>
                    <Col>
                        {Fieldset(hardness, "Hardness", "hardness")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Fieldset(stringToBoolean(lockUpActivated) ? "Yes" : "No", "Lock Up Activated", "lockUpActivated")}
                    </Col>
                    <Col>
                        {Fieldset(stringToBoolean(locked) ? "Yes" : "No", "Locked", "Locked")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    </>
}

const stringToBoolean = (val: string) => val === 'true'