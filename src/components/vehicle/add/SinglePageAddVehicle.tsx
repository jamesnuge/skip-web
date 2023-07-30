
import { ReactNode, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Dropdown, DropdownButton, ProgressBar, Row, Toast, ToastContainer } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { SuspensionForm } from './SuspensionForm'
import { WeightForm } from './WeightForm'
import './AddVehicleForm.css'
import { TransmissionForm } from './TransmissionForm'
import { TyresAndRimsForm } from './TyresAndRimsForm'
import { ConverterForm } from './ConverterForm'
import { WheelieBarsForm } from './WheelieBarForm'
import { ChassisForm } from './ChassisForm'
import { ClutchForm } from './ClutchForm'
import { VehicleForm } from './VehicleForm'
import { TemplateMap, vehicleApi } from '../vehicleApi'
import { Vehicle } from '../Vehicle'
import { useHistory } from 'react-router-dom'
import { InductionForm } from './InductionForm'
import { EngineForm } from './EngineForm'


const formStages: ((list: string[], displayAllFields: boolean, index: number) => ReactNode)[] = [
    (schema, displayAllFields, index) => <VehicleForm schema={schema} displayAllFields={displayAllFields} index={index}/>,
    (list, displayAllFields, index) => <WeightForm schema={list} displayAllFields={displayAllFields} index={index}/>,
    () => <SuspensionForm />,
    () => <EngineForm />,
    () => <InductionForm />,
    () => <TransmissionForm />,
    () => <TyresAndRimsForm />,
    () => <ConverterForm />,
    () => <WheelieBarsForm />,
    () => <ChassisForm />,
    () => <ClutchForm />
]

export const AddVehicleSinglePage = () => {
    const [templates, setTemplates] = useState<TemplateMap | undefined>(undefined)
    const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined)
    const form = useForm();
    const history = useHistory();
    const watchName = form.watch("name");

    const handleFetchData = async () => {
        const response = await vehicleApi.getTemplates()
        const schema = await vehicleApi.getSchema()
        console.log(schema);
        setTemplates(response);
    }

    useEffect(() => {
        handleFetchData();
    }, []);

    const saveVehicle = (vehicle: unknown) => {
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

    const getTemplateFields = (templateName: string | undefined) => {
        if (!templateName || !templates) {
            return []
        } else {
            return templates[templateName]
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
        <FormProvider {...form}>
            <h3>Add Vehicle</h3>
            <Row>
                <Col xs={10} />
                <Col>
                    Build vehicle based on template:
                    <DropdownButton id="dropdown-basic-button" title={selectedTemplate || 'Templates'}>
                    {templates && Object.keys(templates).map((template) => {
                        return <Dropdown.Item onClick={() => setSelectedTemplate(template)}>{template}</Dropdown.Item>
                    })}
    </DropdownButton>
                </Col>
            </Row>
            {watchName && <h4>{watchName}</h4>}
            <br />
            <form onSubmit={form.handleSubmit(saveVehicle)}>
                <Accordion defaultActiveKey={formStages.map((_, i) => i+"")} alwaysOpen>
                    {formStages.map((stage, index) => <div>{stage(getTemplateFields(selectedTemplate), !selectedTemplate, index)}</div>)}
                </Accordion>
                <br />
                <div>
                    {<Button variant="success" type="submit">Submit</Button>}
                </div>
            </form>
        </FormProvider>
        <br />
    </Container>

}