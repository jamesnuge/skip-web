
import { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Dropdown, DropdownButton, Row, Toast, ToastContainer } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import './AddVehicleForm.css'
import { TemplateMap, vehicleApi } from '../vehicleApi'
import { useHistory } from 'react-router-dom'
import { VehicleSectionForm } from './VehicleSectionForm'
import { Vehicle } from '../Vehicle'
import { AddFieldModal } from '../newAdd/AddFieldsModal'
import _ from 'lodash'
import { LeftCol, RightCol } from './SinglePageAddVehicle.styled'


export const AddVehicleSinglePage = () => {
    const [templates, setTemplates] = useState<TemplateMap | undefined>(undefined)
    const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined)
    const [previouslySelectedTemplate, setPreviouslySelectedTemplate] = useState<string | undefined>(undefined)
    const [customFields, setCustomFields] = useState<string[]>([]);
    const [schema, setSchema] = useState<any | undefined>(undefined)
    const [allFields, setAllFields] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined)
    const [show, setShow] = useState<boolean>(false);
    const form = useForm();
    const history = useHistory();
    const watchName = form.watch("name");

    const handleFetchData = async () => {
        const response = await vehicleApi.getTemplates()
        const schema = await vehicleApi.getSchema()
        setSchema(schema);
        setTemplates(response);
        setAllFields(getAllFields(schema))
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
        allFields.filter((field) => templateName && templates![templateName].indexOf(field) === -1)
            .forEach((field) => form.unregister(field));
    }

    const clearTemplate = () => {
        if (hasTemplate()) {
            const currentTemplate = selectedTemplate
            allFields.filter((field) => templates![currentTemplate!].indexOf(field) === -1)
                .forEach((field) => {
                    form.register(field);
                });
        } else if (hasCustomFields()) {
            allFields.filter((field) => customFields.indexOf(field) === -1)
            .forEach(form.register as any)
        }
        setSelectedTemplate(undefined);
        setCustomFields([])
    };

    const handleClose = () => {
        setShow(false);
    }

    const handleSave = (customFieldsToAdd: string[]) => {
        if (selectedTemplate) {
            setPreviouslySelectedTemplate(selectedTemplate)
        }
        setSelectedTemplate(undefined)
        setCustomFields(customFieldsToAdd);
        setShow(false);
    }

    const hasCustomFields = () => customFields.length > 0
    const hasTemplate = () => templates && selectedTemplate

    const getCurrentFields = () => {
        if (hasTemplate()) {
            return templates![selectedTemplate!]
        } else if (hasCustomFields()) {
            return customFields
        } else {
            return allFields;
        }
    }

    const schemaRenderProps = (schema ? Object.keys(schema.properties) : []).filter((key) => schema.properties[key].type === 'object')
        .map((key, index) => {
            return {
                schema: schema.properties[key],
                index: index + 1,
                section: key,
                templateFields: getTemplateFieldsForSection(key, getCurrentFields())
            }
        });
    const activeEventKeys = calculateActiveEventKeys(schemaRenderProps, !!selectedTemplate);
    const handleTemplateReset = () => {
        setSelectedTemplate(previouslySelectedTemplate);
        setCustomFields([])
        setPreviouslySelectedTemplate(undefined);
    }

    const getResetButton = () => <Dropdown.Item onClick={() => form.reset()}>Clear all fields</Dropdown.Item>

    const getMenuItems = () => {
        if (hasTemplate()) {
            return <>
                <Dropdown.Item onClick={() => setShow(true)}>Add fields</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item variant="danger" onClick={clearTemplate}>Remove template</Dropdown.Item>
                <Dropdown.Divider/>
                {getResetButton()}
                </>
        } else if (hasCustomFields()) {
            return <>
                <Dropdown.Item onClick={() => setShow(true)}>Add/Remove fields</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item variant="danger" onClick={clearTemplate}>Remove template</Dropdown.Item>
                <Dropdown.Divider/>
                {getResetButton()}
            </>
        } else {
            return templates ? <>{Object.keys(templates!).map((template) => {
                            return <Dropdown.Item onClick={() => setTemplateAndUnregisterFields(template)}>{template}</Dropdown.Item>
                        })}<Dropdown.Divider/>{getResetButton()}</> : <></>
        }
    }

    const getTemplateMenuTitle = () => {
        if (hasTemplate()) {
            return selectedTemplate
        } else if (hasCustomFields()) {
            return previouslySelectedTemplate + "+  "
        } else {
            return 'Templates menu'
        }
    }


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
        {show && <AddFieldModal vehicleSchema={schema} currentFields={templates![selectedTemplate!]} show={show} handleSave={(value: any) => handleSave(value)} handleClose={() => setShow(false)}/>}
        <FormProvider {...form}>
            <h3>Add Vehicle</h3>
            <form onSubmit={form.handleSubmit(saveVehicle)}>
            <Row>
                <LeftCol>
                    {<Button variant="success" type="submit">Submit</Button>}
                </LeftCol>
                <RightCol>
                    <DropdownButton id="dropdown-basic-button" title={getTemplateMenuTitle()}>
                        {getMenuItems()}
                    </DropdownButton>
                </RightCol>
            </Row>
            <br />
                {schema && <Accordion defaultActiveKey={activeEventKeys} alwaysOpen>
                    <VehicleSectionForm schema={schema} index={0} templateFields={getTemplateFieldsForSection(undefined, ["name"])} />
                    {schemaRenderProps.filter((props: any) => (props.templateFields && props.templateFields.length > 0))
                        .map((props, index) => <VehicleSectionForm schema={props.schema} section={props.section} index={index} templateFields={props.templateFields} />)}
                </Accordion>
                }
            </form>
        </FormProvider>
        <br />
    </Container>

}

const getTemplateFieldsForSection = (section: string | undefined, fields: string[]) => fields
    .filter((i) => section ? i.startsWith(`${section}.`) : i.indexOf('.') === -1)
    .map((i) => section ? i.substring(section.length + 1) : i)

const calculateActiveEventKeys = (schemaRenderProps: any[], hasTemplate: boolean) => {
    return schemaRenderProps.map((i, index) => {
        if (hasTemplate && !i.templateFields) {
            return "_";
        }
        return index + "";
    }).filter((i) => i !== "_")
}

const fieldsToIgnore = ['id', 'archived']

const getAllFields: (schema: any, key?: string) => string[] = (schema: any, key?: string) => {
    return _.flatMap(Object.keys(schema.properties), (propertyName) => {
        if (fieldsToIgnore.indexOf(propertyName) !== -1) {
            return [];
        }
        const property = schema.properties[propertyName]
        return property.type === 'object' ? getAllFields(property, `${propertyName}.`) : [`${key || ''}${propertyName}`]
    });
}