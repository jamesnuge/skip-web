import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const ConverterForm = () => {
    const {register} = useFormContext();
    const registerConverterInput = (name: string, props: any) => register(`converter.${name}`, props)
   return <>
    <h4>Tyres and Rims:</h4>
    <Card>
        <Card.Body>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="brand" className='text-start'>Pump Size:</label>
                    <Form.Control type="number" {...registerConverterInput("pumpSize", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="stator" className='text-start'>Stator:</label>
                    <Form.Control type="text" {...registerConverterInput("stator", { required: true })} />
                </Col>
                <Col xs={1} />
            </Row>
        </Card.Body>
    </Card>
</>
}
