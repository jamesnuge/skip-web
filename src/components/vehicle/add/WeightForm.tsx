import { useFormContext } from "react-hook-form"
import { Accordion, AccordionButton, Card, Col, Form, Row, } from "react-bootstrap"

export interface WeightFormProps {
    schema: string[];
    displayAllFields: boolean;
    index: number;
}

export interface SchemaField {
    displayName: string,
    field: string,
    type: string
}

const weightFields = [
    {
        displayName: "Front Left",
        field: "frontLeft",
        type: "number"
    }, {
        displayName: "Front Right",
        field: "frontRight",
        type: "number"
    }, {
        displayName: "Rear Left",
        field: "rearLeft",
        type: "number"
    }, {
        displayName: "Rear Right", 
        field: "rearRight",
        type: "number"
    }, {
        displayName: "Addtional",
        field: "additional",
        type: "number"
    }];

export const WeightForm = ({schema, displayAllFields, index}: WeightFormProps) => {
    const {register} = useFormContext();
    const registerWeightInput = (name: string, props: any) => register(`weight.${name}`, props)
    const schemaWeightFields = weightFields.filter((field) => displayAllFields || schema.find((schemaField) => schemaField === `weight.${field.field}`))

    const body = schemaWeightFields.reduce((acc, _, index, array) => {
        if (index % 2 === 0) {
            acc.push(array.slice(index, Math.max(index+2, array.length)))
        }
        return acc;
    }, [] as SchemaField[][])
    .map((fields) => {
        const fieldOne = fields[0];
        const fieldTwo = fields[1];
                return <Row>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor={fieldOne.field} className='text-start'>{fieldOne.displayName}:</label>
                        <Form.Control type={fieldOne.type} {...registerWeightInput(fieldOne.field, { required: true })} />
                    </Col>
                    {fields[1] && <Col>
                        <label htmlFor={fieldTwo.field} className='text-start'>{fieldOne.displayName}:</label>
                        <Form.Control type={fieldTwo.type} {...registerWeightInput(fieldOne.field, { required: true })} />
                    </Col>}
                    <Col xs={1} />
                </Row>
    })


    return <>
            <Accordion.Item eventKey={index+""}>
                <Accordion.Header>Weight</Accordion.Header>
                <Accordion.Body>
                    {body}
                <br />
                </Accordion.Body>
            </Accordion.Item>
    </>
}