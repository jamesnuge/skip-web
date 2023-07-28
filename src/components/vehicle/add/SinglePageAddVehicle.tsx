
import { ReactNode, useState } from 'react'
import { Button, Container, ProgressBar, Toast, ToastContainer } from 'react-bootstrap'
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
import { vehicleApi } from '../vehicleApi'
import { Vehicle } from '../Vehicle'
import { useHistory } from 'react-router-dom'
import { InductionForm } from './InductionForm'
import { EngineForm } from './EngineForm'

const formStages: ReactNode[] = [
    <VehicleForm/>,
    <WeightForm />,
    <SuspensionForm />,
    <EngineForm/>,
    <InductionForm/>,
    <TransmissionForm />,
    <TyresAndRimsForm />,
    <ConverterForm />,
    <WheelieBarsForm />,
    <ChassisForm/>,
    <ClutchForm/>
]

export const AddVehicleSinglePage = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined)
    const form = useForm();
    const history = useHistory();
    const watchName = form.watch("name");
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
            {watchName && <h4>{watchName}</h4>}
            <br/>
            <form onSubmit={form.handleSubmit(saveVehicle)}>
                <div>{formStages}</div>
                <br />
                <div>
                    {<Button variant="success" type="submit">Submit</Button>}
                </div>
            </form>
        </FormProvider>
        <br/>
    </Container>

}