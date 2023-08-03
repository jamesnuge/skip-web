
import { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Dropdown, DropdownButton, ProgressBar, Row, Toast, ToastContainer } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import './AddVehicleForm.css'
import { TemplateMap, vehicleApi } from '../vehicleApi'
import { useHistory } from 'react-router-dom'
import { VehicleSectionForm } from './VehicleSectionForm'
import _ from 'lodash'
import { Vehicle } from '../Vehicle'


export const AddVehicleSinglePage = () => {
    const [templates, setTemplates] = useState<TemplateMap | undefined>(undefined)
    const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined)
    const [schema, setSchema] = useState<any | undefined>(undefined)
    const [allFields, setAllFields] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined)
    const form = useForm();
    const history = useHistory();
    const watchName = form.watch("name");

    const handleFetchData = async () => {
        const response = await vehicleApi.getTemplates()
        const schema = await vehicleApi.getSchema()
        setSchema(schema);
        setTemplates(response);
        setAllFields(getAllFields(schema))
        // console.log('+++ Schema fields +++')
        // console.log(getAllFields(schema))
    }

    useEffect(() => {
        handleFetchData();
    }, []);

    const saveVehicle = (vehicle: unknown) => {
        console.log(vehicle);
        vehicleApi.create(vehicle as Vehicle).then(
            () => {
                setErrorMessage(undefined);
                setSuccessMessage(`Successfully saved chassis`);
                history.push("/vehicle/all")
            },
            (err) => {
                setSuccessMessage(undefined);
                setErrorMessage("Unable to save location, ensure all fields are present and correct");
                console.error(err);
            }
        )
    }

    const setTemplateAndUnregisterFields = (templateName: string) => {
        setSelectedTemplate(templateName);
        allFields.filter((field) => templates![templateName].indexOf(field) == -1)
            .forEach((field) => form.unregister(field));
    }

    const schemaRenderProps = (schema ? Object.keys(schema.properties) : []).filter((key) => schema.properties[key].type == 'object')
         .map((key, index) => {
                        return {
                            schema: schema.properties[key],
                            index: index+1,
                            section: key,
                            templateFields: templates && selectedTemplate ? getTemplateFieldsForSection(key, templates[selectedTemplate]): undefined
                        }
                    })
    const activeEventKeys = calculateActiveEventKeys(schemaRenderProps, !!selectedTemplate);
    
    return <Container>
        <ToastContainer className="p-3" position='top-end'>
            <Toast bg="success" show={successMessage !== undefined} onClose={() => setSuccessMessage(undefined)}>
                <Toast.Header>
                    <strong className="me-auto">Vehicle Added</strong>
                </Toast.Header>
                <Toast.Body>Successfully saved new vehicle</Toast.Body>
            </Toast>
            <Toast bg="error" show={errorMessage !== undefined} onClose={() => setErrorMessage(undefined)}>
                <Toast.Header>
                    <strong className="me-auto">Failed to add new vehicle</strong>
                </Toast.Header>
                <Toast.Body>Unable to save result. Please check all values are present and correct</Toast.Body>
            </Toast>
        </ToastContainer>
        <FormProvider {...form}>
            <h3>Add Vehicle</h3>
            <Row>
                <Col xs={10} />
                <Col>
                    Build vehicle based on template:
                    <DropdownButton id="dropdown-basic-button" title={selectedTemplate || 'Templates'}>
                    {templates && Object.keys(templates).map((template) => {
                        return <Dropdown.Item onClick={() => setTemplateAndUnregisterFields(template)}>{template}</Dropdown.Item>
                    })}
    </DropdownButton>
                </Col>
            </Row>
            {watchName && <h4>{watchName}</h4>}
            <br />
            <form onSubmit={form.handleSubmit(saveVehicle)}>
                {schema && <Accordion defaultActiveKey={activeEventKeys} alwaysOpen>
                    <VehicleSectionForm schema={schema} index={0} templateFields={templates && selectedTemplate ? getTemplateFieldsForSection(undefined, templates[selectedTemplate]) : undefined} />
                    {schemaRenderProps.filter((props:any) => (props.templateFields && props.templateFields.length > 0) || !selectedTemplate)
                        .map((props, index) => <VehicleSectionForm schema={props.schema} section={props.section} index={index} templateFields={props.templateFields} />)}
                </Accordion>
                }
                <br />
                <div>
                    {<Button variant="success" type="submit">Submit</Button>}
                </div>
            </form>
        </FormProvider>
        <br />
    </Container>

}

const getTemplateFieldsForSection = (section: string | undefined, fields: string[]) => fields
    .filter((i) => section ? i.startsWith(`${section}.`) : i.indexOf('.') == -1)
    .map((i) => section ? i.substring(section.length + 1) : i)

const calculateActiveEventKeys = (schemaRenderProps: any[], hasTemplate: boolean) => {
    return schemaRenderProps.map((i, index) => {
        if (hasTemplate && !i.templateFields) {
            return "_";
        }
        return index + "";
    }).filter((i) => i != "_")
}

const fieldsToIgnore = ['id', 'archived']

const getAllFields: (schema: any, key?: string) => string[] = (schema: any, key?: string) => {
    return _.flatMap(Object.keys(schema.properties), (propertyName) => {
        if (fieldsToIgnore.indexOf(propertyName) != -1) {
            return [];
        }
        const property = schema.properties[propertyName]
        return property.type === 'object' ? getAllFields(property, `${propertyName}.`) : [`${key || ''}${propertyName}`]
    });
}