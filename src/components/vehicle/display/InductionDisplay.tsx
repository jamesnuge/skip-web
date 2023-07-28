import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { Vehicle } from '../Vehicle';
import { Fieldset } from './VehicleDisplay';

export const InductionDisplay = ({ induction }: Vehicle) => {
    const {
        carburettorSize,
        turboChargedBrand,
        turboChargedSize,
        superChargedBrand,
        superChargedSize,
        nitrousKits,
        proChargerSize
    } = induction!!
    return <>
        <Container>
            <FormGroup>
                <Row>
                    <Col>
                        {carburettorSize && Fieldset(carburettorSize!!, "Carburettor Size", "carburretorSize")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {turboChargedBrand && Fieldset(turboChargedBrand!!, "Turbo charger brand", "turboChargedBrand")}
                    </Col>
                    <Col>
                        {turboChargedSize && Fieldset(turboChargedSize!!, "Turbo charger size", "turboChargedSize")}
                    </Col>
                    </Row>
                <Row>
                    <Col>
                        {superChargedBrand && Fieldset(superChargedBrand!!, "Super charger brand", "superChargedBrand")}
                    </Col>
                    <Col>
                        {superChargedSize && Fieldset(superChargedSize!!, "Super charger size", "superChargedSize")}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {nitrousKits && Fieldset(nitrousKits!!, "Nitrous Kits", "nitrousKits")}
                    </Col>
                    <Col>
                        {proChargerSize && Fieldset(proChargerSize!!, "Pro Charger Size", "proChargerSize")}
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    </>
}