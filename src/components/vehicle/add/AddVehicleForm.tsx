import { ReactNode, useState } from "react"
import { Button, Container, ProgressBar, Toast, ToastContainer } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { SuspensionForm } from "./SuspensionForm"
import { WeightForm } from "./WeightForm"
import './AddVehicleForm.css'
import { TransmissionForm } from "./TransmissionForm"
import { TyresAndRimsForm } from "./TyresAndRimsForm"
import { ConverterForm } from "./ConverterForm"
import { WheelieBarsForm } from "./WheelieBarForm"
import { ChassisForm } from "./ChassisForm"
import { ClutchForm } from "./ClutchForm"
import { VehicleForm } from "./VehicleForm"
import { vehicleApi } from "../vehicleApi"
import { Vehicle } from "../Vehicle"
import { useHistory } from "react-router-dom"

const formStages: ReactNode[] = [
    <VehicleForm/>,
    <WeightForm />,
    <SuspensionForm />,
    <TransmissionForm />,
    <TyresAndRimsForm />,
    <ConverterForm />,
    <WheelieBarsForm />,
    <ChassisForm/>,
    <ClutchForm/>
]
const formStagesMaxIndex = formStages.length - 1;

export const AddVehicleMultiStageForm = () => {
    const [step, setStep] = useState(0)
    const [name, setName] = useState<string | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined)
    const form = useForm();
    const history = useHistory();
    const watchName = form.watch("name");
    const currentStep = step + 1
    const numberOfSteps = formStagesMaxIndex + 1
    const currentStepProgress = currentStep/numberOfSteps * 100

    const nextStep = () => {
        setName(watchName)
        setStep(Math.min(step + 1, formStagesMaxIndex))
    }
    const previousStep = () => setStep(Math.max(step - 1, 0))
    const saveVehicle = (vehicle: unknown) => {
        console.log(vehicle)
        // TODO: Fix casting by adding typesafe validation
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
            {name && <h4>{name}</h4>}
            {/* <div className="page-counter">Page: {step + 1}/{formStagesMaxIndex + 1}</div> */}
            <ProgressBar now={currentStepProgress} label={`${currentStep}/${numberOfSteps}`} />
            <br/>
            <form onSubmit={form.handleSubmit(saveVehicle)}>
                <div>{formStages[step]}</div>
                <br />
                <div>
                    <Button variant="secondary" onClick={previousStep}>Previous</Button>
                    &nbsp;
                    <Button onClick={nextStep}>Next</Button>
                </div>
                <div>
                    {step === formStagesMaxIndex && <Button variant="success" type="submit">Submit</Button>}
                </div>
            </form>
        </FormProvider>
    </Container>

}