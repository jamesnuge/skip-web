import { useFormContext } from 'react-hook-form';
import { Card, Col, Form, Row, } from 'react-bootstrap'
    // brand TEXT,
    // cubic_inch DECIMAL,
    // bore DECIMAL,
    // stroke DECIMAL


export const EngineForm = () => {
    const {register} = useFormContext();
    const registerEngineInput = (name: string, props: any) => register(`engine.${name}`, props)
   return <>
    <h4>Engine:</h4>
    <Card>
        <Card.Body>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="brand" className='text-start'>Brand:</label>
                        <Form.Control type="text" {...registerEngineInput("brand", { required: false })} />
                    </Col>
                    <Col>
                        <label htmlFor="cubicInch" className='text-start'>Cubic Inch:</label>
                        <Form.Control type="number" {...registerEngineInput("cubicInch", { required: false })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="bore" className='text-start'>Bore:</label>
                        <Form.Control type="number" {...registerEngineInput("bore", { required: false })} />
                    </Col>
                    <Col>
                        <label htmlFor="cubicInch" className='text-start'>Stroke:</label>
                        <Form.Control type="number" {...registerEngineInput("stroke", { required: false })} />
                    </Col>
                    <Col xs={1} />
                </Row>
            </Card.Body>
        </Card>
    </>
}
