import { useFormContext } from 'react-hook-form';
import { Card, Col, Form, Row, } from 'react-bootstrap'

export const InductionForm = () => {
    const {register} = useFormContext();
    const registerEngineInput = (name: string, props: any) => register(`induction.${name}`, props)
   return <>
    <h4>Induction:</h4>
    <Card>
        <Card.Body>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="carburettorSize" className='text-start'>Carburettor Size:</label>
                        <Form.Control type="number" {...registerEngineInput("carburettorSize", { required: false })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="turboChargedBrand" className='text-start'>Turbo charger brand:</label>
                        <Form.Control type="text" {...registerEngineInput("turboChargedBrand", { required: false })} />
                    </Col>
                    <Col>
                        <label htmlFor="turboChargedSize" className='text-start'>Turbo charger size:</label>
                        <Form.Control type="number" {...registerEngineInput("turboChargerSize", { required: false })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="superChargedBrand" className='text-start'>Super charger brand:</label>
                        <Form.Control type="text" {...registerEngineInput("superChargedBrand", { required: false })} />
                    </Col>
                    <Col>
                        <label htmlFor="superChargedSize" className='text-start'>Super charger size:</label>
                        <Form.Control type="number" {...registerEngineInput("superChargerSize", { required: false })} />
                    </Col>
                    <Col xs={1} />
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor="nitrousKits" className='text-start'>Nitrous Kits:</label>
                        <Form.Control type="number" {...registerEngineInput("superChargedBrand", { required: false })} />
                    </Col>
                    <Col>
                        <label htmlFor="proChargerSize" className='text-start'>Pro charger size:</label>
                        <Form.Control type="text" {...registerEngineInput("superChargerSize", { required: false })} />
                    </Col>
                    <Col xs={1} />
                </Row>
            </Card.Body>
        </Card>
    </>
}
