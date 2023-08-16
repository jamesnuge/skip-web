import { Button, Col, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap'
import { toCapitalizedWords } from '../../../util/StringUtil';
import { FormProvider, useForm } from 'react-hook-form';

export interface AddFieldModalProps {
    vehicleSchema: any,
    currentFields: string[],
    show: boolean,
    handleSave: any,
    handleClose: () => void
}

export const AddFieldModal = ({ show, handleClose, handleSave, vehicleSchema, currentFields }: AddFieldModalProps) => {
  
  const form = useForm();
  return <Modal show={show} onHide={handleClose} size="xl">
        <FormProvider {...form}>
    <Modal.Header closeButton>
      <Modal.Title>Add extra fields</Modal.Title>
    </Modal.Header>
    <Modal.Body>
            <form onSubmit={form.handleSubmit(handleSave)}></form>
      <Tabs className="mb-3">
        {Object.keys(vehicleSchema.properties).filter((key) => vehicleSchema.properties[key].type === 'object').map((key) => <Tab key={key} eventKey={key} title={toCapitalizedWords(key)}>
          <VehicleSectionForm schema={vehicleSchema.properties[key]} section={key} form={form} templateFields={currentFields}/>
        </Tab>)}
      </Tabs>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" type="submit" onClick={() => handleSave(flattenFields(form.getValues(), currentFields))}>
        Add Fields
      </Button>
    </Modal.Footer>
      </FormProvider>
  </Modal>;
}

const flattenFields = (fieldMap: any, currentFields: string[]) => {
  const fieldsToAdd = Object.entries(fieldMap).flatMap(([key, value]: [string, any]) => {
    return Object.entries(value)
      .map(([innerKey, innerValue]) => [`${key}.${innerKey}`, innerValue])
      .filter(([_, innerValue]) => innerValue)
      .map(([fieldKey, _]) => fieldKey)
  });
  return fieldsToAdd.concat(currentFields.filter((field) => containsValue(fieldsToAdd as string[], field)));
}

const ignoredFields = ['id', 'archived']

const VehicleSectionForm = ({ schema, section, templateFields, form }: { [id: string]: any }) => {

  const registerSectionInput = (fieldName: string, props: any) => form.register((section ? `${section}.` : '') + fieldName, props)

  const schemaWeightFields = Object.keys(schema.properties)
    .filter((key) => !containsValue(ignoredFields, key))
    .map((key) => {
      return { key, ...schema.properties[key], value: containsValue(templateFields, `${section}.${key}`) }
    })
  const body = schemaWeightFields.reduce((acc, _, index, array) => {
    if (index % 2 === 0) {
      acc.push(array.slice(index, Math.min(index + 2, array.length)));
    }
    return acc;
  }, [] as any[][])
    .map((fields: any, index: number) => {
      const fieldOne = fields[0];
      const fieldTwo = fields[1];
      form.setValue(`${section}.${fieldOne.key}`, fieldOne.value);
      if (fieldTwo) {
        form.setValue(`${section}.${fieldTwo.key}`, fieldTwo.value);
      }
      return <Row key={index}>
        <Col xs={1} />
        <Col>
          <label htmlFor={fieldOne.key} className='text-start'>{fieldOne.title || toCapitalizedWords(fieldOne.key)}:</label>
          <Form.Check type='checkbox' {...registerSectionInput(fieldOne.key, { required: true })} />
        </Col>
        {fieldTwo ? <Col>
          <label htmlFor={fieldTwo.key} className='text-start'>{fieldTwo.title || toCapitalizedWords(fieldTwo.key)}:</label>
          <Form.Check type='checkbox' {...registerSectionInput(fieldTwo.key, { required: true })} />
        </Col> : <Col xs={5} />}
        <Col xs={1} />
      </Row>
    })
  return <>{body}</>
}

const containsValue = (arr: string[], item: string) => arr.indexOf(item) !== -1 