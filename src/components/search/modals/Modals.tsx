import { useState } from "react";
import { Button, Col, Container, Form, FormControl, FormGroup, Modal, Row } from "react-bootstrap"
import { useForm } from "react-hook-form";

export const AddCriteriaModal = ({ show, onHide, onSubmit }: any) => {
    return <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Search Parameters
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <MySelectComponent availableFields={[]}/>
            {/* <Form>
                <Row>
                    <Col>
                        <Form.Check type={'checkbox'} label="Trackmeter"></Form.Check>
                    </Col>
                    <Col>
                        <Form.Check type={'checkbox'} label="Track temperature"></Form.Check>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type={'checkbox'} label="Altitude"></Form.Check>
                    </Col>
                    <Col>
                        <Form.Check type={'checkbox'} label="Location"></Form.Check>
                    </Col>
                </Row>
            </Form> */}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>
                Add
            </Button>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
        </Modal.Footer>
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
    displayName: String,
    field: String
}

interface SelectProps {
    availableFields: QueryField[]
}

const MySelectComponent = ({availableFields}: SelectProps) => {
  const allOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig'];

  const [filterText, setFilterText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(allOptions);

  const handleFilterChange = (e: any) => {
    const newText = e.target.value;
    setFilterText(newText);

    const filtered = allOptions.filter(option =>
      option.toLowerCase().includes(newText.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <Container>
      <Form>
        <FormGroup>
          <Col sm={12}>
            <FormControl
              type="text"
              placeholder="Type to filter..."
              value={filterText}
              onChange={handleFilterChange}
            />
          </Col>
        </FormGroup>
        
        <FormGroup>
          <Col sm={6}>
            <Form.Select>
              {filteredOptions.map((option: any, index: any) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </Form.Select>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={6}>
            <Button type="submit">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};