import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const TyresAndRimsForm = () => {
    const {register} = useFormContext();
    const registerTyresAndRimsInput = (name: string, props: any) => register(`tyresAndRims.${name}`, props)
   return <>
    <h4>Tyres and Rims:</h4>
    <Card>
        <Card.Body>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="brand" className='text-start'>Brand:</label>
                    <Form.Control type="text" {...registerTyresAndRimsInput("brand", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="second" className='text-start'>Pressure:</label>
                    <Form.Control type="number" {...registerTyresAndRimsInput("pressure", { required: true })} />lbs
                </Col>
                <Col>
                    <label htmlFor="second" className='text-start'>Size:</label>
                    <Form.Control type="number" {...registerTyresAndRimsInput("size", { required: true })} />
                </Col>
                <Col xs={1} />
            </Row>
        </Card.Body>
    </Card>
</>
}
