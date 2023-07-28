
import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const VehicleForm = () => {
    const {register} = useFormContext();
   return <>
   <h4>Details:</h4>
    <Card>
        <Card.Body>
            <Row>
                <Col xs={1} />
                <Col xs={5}>
                    <label htmlFor="first" className='text-start'>Name:</label>
                    <Form.Control type="text" {...register("name", { required: true })} />
                </Col>
                <Col xs={6} />
            </Row>
        </Card.Body>
    </Card>
</>
}
