import React from 'react';
import { Button } from 'semantic-ui-react';
import { Formik, Field, Form } from 'formik';
import { OccupationalHealthcareEntry } from '../types';
import { DiagnosisSelection, TextField } from './FormField';
import { useStateValue } from '../state';

type EntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const initialValues: EntryFormValues = {
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: [],
  type: 'OccupationalHealthcare',
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: '',
  },
};

const AddOccupationalHealthForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.name = requiredError;
          }
          if (!values.date) {
            errors.ssn = requiredError;
          }
          if (!values.specialist) {
            errors.dateOfBirth = requiredError;
          }
          if (!values.diagnosisCodes) {
            errors.occupation = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className='form ui'>
              <Field
                label='Description'
                placeholder='Description'
                name='description'
                component={TextField}
              />
              <Field
                label='Date'
                placeholder='Date'
                name='date'
                component={TextField}
              />
              <Field
                label='Specialist'
                placeholder='Specialist'
                name='specialist'
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field
                label='Employer Name'
                placeholder='Employer Name'
                name='employerName'
                component={TextField}
              />
              <Field
                label='Sick Leave Start'
                placeholder='Sick Leave Start'
                name='sickLeave.startDate'
                component={TextField}
              />
              <Field
                label='Sick Leave End'
                placeholder='Sick Leave End'
                name='sickLeave.endDate'
                component={TextField}
              />
              <Button onClick={onCancel}>Cancel</Button>
              <Button type='submit' disabled={!dirty || !isValid}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddOccupationalHealthForm;
