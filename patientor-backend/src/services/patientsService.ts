/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../../data/patients.json';

import { NonSensitivePatient, NewPatient } from '../types';

import { v1 as uuid } from 'uuid';

const getEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
};
