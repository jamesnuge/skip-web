import { useFormContext } from "react-hook-form";
import { Accordion, Card, Col, Form, Row, } from "react-bootstrap"
import { SchemaField } from "./WeightForm";

export interface VehicleFormProps {
    schema: string[],
    displayAllFields: boolean,
    index: number
}

const detailFields = [
    {
        displayName: "Name",
        field: "name",
        type: "text"
    }
]

export const VehicleForm = ({schema, displayAllFields, index}: VehicleFormProps) => {
    const {register} = useFormContext();
    const schemaWeightFields = detailFields.filter((field) => displayAllFields || schema.find((schemaField) => schemaField === field.field))
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
                        <Form.Control type={fieldOne.type} {...register(fieldOne.field, { required: true })} />
                    </Col>
                    {fields[1] && <Col>
                        <label htmlFor={fieldTwo.field} className='text-start'>{fieldOne.displayName}:</label>
                        <Form.Control type={fieldTwo.type} {...register(fieldOne.field, { required: true })} />
                    </Col>}
                    <Col xs={1} />
                </Row>
    })
    return <>
            <Accordion.Item eventKey={index+""}>
                <Accordion.Header>Details</Accordion.Header>
                <Accordion.Body>
                    {body}
                <br />
                </Accordion.Body>
            </Accordion.Item>
    </>
}
