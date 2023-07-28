import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const InductionDisplay = ({ induction }: Vehicle) => {
    return <>
        {induction && <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {induction!.carburettorSize && Fieldset(induction.carburettorSize!!, "Carburettor Size", "carburretorSize")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {induction!.turboChargedBrand && Fieldset(induction!.turboChargedBrand!!, "Turbo charger brand", "turboChargedBrand")}
                    </Col>
                    <Col>
                        {induction!.turboChargedSize && Fieldset(induction!.turboChargedSize!!, "Turbo charger size", "turboChargedSize")}
                    </Col>
                    </Row>
                <Row>
                    <Col>
                        {induction!.superChargedBrand && Fieldset(induction!.superChargedBrand!!, "Super charger brand", "superChargedBrand")}
                    </Col>
                    <Col>
                        {induction!.superChargedSize && Fieldset(induction!.superChargedSize!!, "Super charger size", "superChargedSize")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {induction!.nitrousKits && Fieldset(induction!.nitrousKits!!, "Nitrous Kits", "nitrousKits")}
                    </Col>
                    <Col>
                        {induction!.proChargerSize && Fieldset(induction!.proChargerSize!!, "Pro Charger Size", "proChargerSize")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>}
    </>
}