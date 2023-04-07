import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const WheelieBarsForm = () => {
    const {register} = useFormContext();
    const registerWheelieBarsInput = (name: string, props: any) => register(`wheelieBars.${name}`, props)
   return <>
    <h4>Wheeliebars:</h4>
    <Card>
        <Card.Body>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="length" className='text-start'>Length:</label>
                    <Form.Control type="number" {...registerWheelieBarsInput("length", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="height" className='text-start'>Height:</label>
                    <Form.Control type="number" {...registerWheelieBarsInput("height", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="stagger" className='text-start'>Stagger:</label>
                    <Form.Control type="number" {...registerWheelieBarsInput("stagger", { required: true })} />
                </Col>
                <Col xs={1} />
            </Row>
        </Card.Body>
    </Card>
</>
}
