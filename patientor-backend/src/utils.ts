import { NewPatient, Gender, EntryType, NewEntry, HealthCheckRating } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };

  return newPatient;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing param' + param);
  }

  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// toNewEntry ===========================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (entryType: unknown): EntryType => {
  if(!entryType || !isEntryType(entryType)){
    throw new Error('Incorrect or missing entry type: ' +entryType);
  } 
  return entryType;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(!rating || !isHealthCheckRating(rating)){
    throw new Error('Incorrect or missing healthcheckrating: ' +rating);
  } 
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  const entryType = parseEntryType(object.type);
  let extraFields = {};

  switch (entryType) {  
    case 'HealthCheck': 
      extraFields = {
        healthCheckRating : parseHealthCheckRating(object.healthCheckRating)
      }; 
      break;
    case 'OccupationalHealthcare': 
      extraFields = {
        employerName : parseString(object.employerName),
        sickLeave: object.sickLeave ? {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        }: undefined
      }; 
    break;
    case 'Hospital':
      extraFields = {
        discharge : {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria),
        }
      }; 
    break;
    default: break;
  }


  const newEntry: NewEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    diagnosisCodes: object.diagnosisCodes,
    type: entryType,
    ...extraFields,
  };

   return newEntry;
};

