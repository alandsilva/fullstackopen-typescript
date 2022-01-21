import patientsData from '../../data/patients.json';

import { PublicPatient, NewPatient, Patient } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};
const addPatient = (patient: NewPatient): PublicPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
    entries: []
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getPatient,
  addPatient,
};
