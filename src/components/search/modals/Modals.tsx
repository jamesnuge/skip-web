import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { useForm } from "react-hook-form";

export const AddCriteriaModal = ({ show, onHide, onSubmit }: any) => {
    return <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Search Parameters
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
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
            </Form>
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
        onSubmit(details.field, value);
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