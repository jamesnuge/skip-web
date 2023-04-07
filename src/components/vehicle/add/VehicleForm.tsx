
import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const VehicleForm = () => {
    const {register} = useFormContext();
   return <>
    <Card>
        <Card.Body>
            <Row>
                <Col xs={4} />
                <Col>
                    <label htmlFor="first" className='text-start'>Enter the name of this new vehicle:</label>
                    <Form.Control type="text" {...register("name", { required: true })} />
                </Col>
                <Col xs={4} />
            </Row>
        </Card.Body>
    </Card>
</>
}
