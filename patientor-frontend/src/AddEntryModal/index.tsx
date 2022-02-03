import React from 'react';
import { Modal, Segment, Form } from 'semantic-ui-react';
import AddHealthCheckForm from './AddHealthCheckForm';
import AddHospitalForm from './AddHospitalForm';
import AddOccupationalHealthForm from './AddOccupationalHealthForm';
import { EntryFormValues } from './FormField';
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  onSubmit: (values: EntryFormValues) => void;
}

const options = [
  { text: 'HealthCheck', value: 'HealthCheck' },
  { text: 'OccupationalHealthcare', value: 'OccupationalHealthcare' },
  { text: 'Hospital', value: 'Hospital' },
];

const AddEntryModal = ({ modalOpen, onClose, error, onSubmit }: Props) => {
  const [type, setType] = React.useState<string>('');

  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    { value }: any
  ) => {
    setType(value);
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new patient</Modal.Header>
      <Modal.Content>
        <label>Type</label>
        <Form.Select value={type} options={options} onChange={onChange} />
        <AddEntryForm type={type} onSubmit={onSubmit} onCancel={onClose} />
        {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      </Modal.Content>
    </Modal>
  );
};

interface AddEntryProps {
  type: string;
  onSubmit: (entry: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ type, onSubmit, onCancel }: AddEntryProps) => {
  switch (type) {
    case 'HealthCheck':
      return <AddHealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />;
    case 'OccupationalHealthcare':
      return (
        <AddOccupationalHealthForm onSubmit={onSubmit} onCancel={onCancel} />
      );
    case 'Hospital':
      return <AddHospitalForm />;
    default:
      return <p>Invalid</p>;
  }
};

export default AddEntryModal;
