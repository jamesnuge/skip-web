import { useFormContext } from 'react-hook-form';
import { SchemaField } from './WeightForm';
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import { toCapitalizedWords } from '../../../util/StringUtil';

export interface VehicleSectionProps {
    schema: any,
    index: number,
    section?: string,
    templateFields?: string[]
}

const ignoredFields = ['id', 'archived']

export const VehicleSectionForm = ({schema, index, section, templateFields}: VehicleSectionProps) => {

    const {register} = useFormContext();
    const registerSectionInput = (fieldName: string, props: any) => register((section ? `${section}.` : '') + fieldName, props)

    const schemaWeightFields = Object.keys(schema.properties)
        .filter((key) => !containsValue(ignoredFields, key) && (templateFields === undefined || containsValue(templateFields, key)))
        .map((key) => {
            return { key, ...schema.properties[key]}
        } )
        .filter((propertySchema) => propertySchema.type !== 'object' && propertySchema.type !== 'array')
    const body = schemaWeightFields.reduce((acc, _, index, array) => {
        if (index % 2 === 0) {
            acc.push(array.slice(index, Math.max(index+2, array.length)))
        }
        return acc;
    }, [] as SchemaField[][])
    .map((fields: any, index: number) => {
        const fieldOne = fields[0];
        const fieldTwo = fields[1];
                return <Row key={index}>
                    <Col xs={1} />
                    <Col>
                        <label htmlFor={fieldOne.key} className='text-start'>{fieldOne.title || toCapitalizedWords(fieldOne.key)}:</label>
                        <Form.Control type={fieldOne.type} {...registerSectionInput(fieldOne.key, { required: true })} />
                    </Col>
                    {fieldTwo ? <Col>
                        <label htmlFor={fieldTwo.key} className='text-start'>{fieldTwo.title || toCapitalizedWords(fieldTwo.key)}:</label>
                        <Form.Control type={matchSchemaTypeToFormType(fieldTwo.type)} {...registerSectionInput(fieldTwo.key, { required: true })} />
                    </Col> : <Col xs={5}/>}
                    <Col xs={1} />
                </Row>
    })
    return <>
            <Accordion.Item eventKey={index+''}>
                <Accordion.Header>{toCapitalizedWords(section) || 'Details'}</Accordion.Header>
                <Accordion.Body>
                    {body}
                <br />
                </Accordion.Body>
            </Accordion.Item>
    </>
}

const matchSchemaTypeToFormType = (schemaType: string) => {
    switch(schemaType) {
        case 'integer': 
            return 'number';
        case 'number': 
            return 'number';
        default:
            return 'text';
    }
}

const containsValue = (arr: string[], item: string) => arr.indexOf(item) !== -1 