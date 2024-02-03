import { useState } from "react";
import { Button, Col, Container, Form, FormControl, FormGroup, Modal, Row } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form";
import { Divider } from "../SearchPage.styled";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";
import { CustomQueryField } from "../../results/resultApi";

export interface AddCriteriaModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (field: {name: string, field: string}) => void;
    extraFields: CustomQueryField[];
}

export const AddCriteriaModal = ({ show, onHide, onSubmit, extraFields }: AddCriteriaModalProps) => {
    const { register, handleSubmit, control } = useForm();
    const findExtraFieldByFieldName = (fieldName: string): CustomQueryField => extraFields.find((extraField: any) => extraField.field === fieldName)!
    const submitMappedField = ({displayName, field}: CustomQueryField) => {
        onSubmit({name: displayName, field})
    }
    return <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Search Parameters
            </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit((value) => {
            console.log(value);
            if (!value.searchField) {
                const filtered = extraFields.filter(option =>
                    option.displayName.toLowerCase().includes(value.filter.toLowerCase())
                );
                submitMappedField(filtered[0])
            } else {
                submitMappedField(findExtraFieldByFieldName(value.searchField))
            }
        })}>
            <Modal.Body>
                <MySelectComponent availableFields={extraFields} register={register} control={control} />
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit">
                    Add
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
}

export const CriteriaModal = ({ show, onHide, onSubmit, details }: any) => {
    const { register, handleSubmit } = useForm();
    const submitClick = (value: any) => {
        onSubmit(details, value);
        onHide();
    };
    return <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>
                {details?.name}
            </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(submitClick)}>
            <Modal.Body>
                <Form.Control type="number" {...register("value", { required: true })}></Form.Control>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit">
                    Submit
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </form>
    </Modal>
}

interface QueryField {
    displayName: string,
    field: string
}

interface SelectProps {
    availableFields: QueryField[],
    register: any,
    control: any
}

const MySelectComponent = ({ availableFields, register, control }: SelectProps) => {
    const [filterText, setFilterText] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(availableFields || []);

    const handleFilterChange = (e: any) => {
        const newText = e.target.value;
        setFilterText(newText);

        const filtered = availableFields.filter(option =>
            option.displayName.toLowerCase().includes(newText.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    console.log(filteredOptions)
    const getFilteredOptions = () => filteredOptions
    return (
        <Container>
            <FormGroup>
                <Col sm={12}>
                    <FormControl
                        type="text"
                        {...register("filter")}
                        placeholder="Type to filter..."
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </Col>
            </FormGroup>
            <br />
            <FormGroup>
                <Col sm={6}>
                    <Controller
                        name="searchField"
                        control={control}
                        render={({ field }) => (
                            <select {...field}>
                                {filteredOptions.map((option) => (
                                    <option key={option.field as any} value={option.field as any}>
                                        {option.displayName}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </Col>
            </FormGroup>
        </Container>
    );
};