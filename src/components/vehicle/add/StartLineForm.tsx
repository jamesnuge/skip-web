import { useFormContext } from "react-hook-form";
import { Card, Col, Form, Row, } from "react-bootstrap"

export const StartLineForm = () => {
    const {register} = useFormContext();
    const registerStartLine = (name: string, props: any) => register(`startLine.${name}`, props)
   return <>
    <h4>Start Line:</h4>
    <Card>
        <Card.Body>
            <Row>
                <Col xs={1} />
                <Col>
                    <label htmlFor="brand" className='text-start'>Launch RPM:</label>
                    <Form.Control type="text" {...registerStartLine("launchRpm", { required: true })} />
                </Col>
                <Col>
                    <label htmlFor="second" className='text-start'>Boost:</label>
                    <Form.Control type="number" {...registerStartLine("boost", { required: true })} />lbs
                </Col>
                <Col xs={1} />
            </Row>
        </Card.Body>
    </Card>
</>
}
