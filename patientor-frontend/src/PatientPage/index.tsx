import axios from 'axios';
import React from 'react';
import {
    useParams
  } from 'react-router-dom';
import { useStateValue, setPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient as PatientType, Gender, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../types";
import { Icon, Card } from 'semantic-ui-react';


const Patient = () => {
    const [{ patient }, dispatch] = useStateValue();
        React.useEffect(() => {
            const fetchPatientById = async () => {
            try {
                const {data: patientFromApi} = await axios.get<PatientType>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(patientFromApi));
            } catch (e) {
                console.error(e);
              }
    };
    if(patient) {
        if(patient.id !== id) {
            void fetchPatientById();
        }
    } else {
        void fetchPatientById();
    }
    
}, []);

    const { id } = useParams<{ id: string }>();

    return (
        <div>
            {patient && <div>
          <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          {patient.entries.map((entry) => <EntryItem key={entry.id} entry={entry}/>)}
        </div>}
        </div>
        
    );
};

const GenderIcon = ({gender}: {gender: Gender}) => {
    switch(gender) {
        case 'male': return <Icon name='mars' />;
        case 'female': return <Icon name='venus' />;
        case 'other': return <Icon name='transgender alternate' />;
        default: return <Icon name='neuter' />;
    }
};

const EntryItem = ({entry}: {entry: Entry}) => {
    switch(entry.type) {
        case 'Hospital': return <HospitalItem entry={entry}/>;
        case 'HealthCheck': return <HealthCheckItem entry={entry}/>;
        case 'OccupationalHealthcare': return <OccupationalHealthcareItem entry={entry}/>;
        default: return null;
    }
};

const HospitalItem = ({entry}: {entry: HospitalEntry}) => {
    return <Card>
        <Card.Content header={<>{entry.date} <Icon name='hospital'/></>} />
        <Card.Content description={entry.description} />
        <Card.Content extra>
            <Icon name='calendar'/> {entry.discharge.date}
            <Icon name='question'/> {entry.discharge.criteria}
         </Card.Content>
         <Card.Content>
         {entry.diagnosisCodes && <DiagnosisList codes={entry.diagnosisCodes}/>}
         </Card.Content>
    </Card>;
};

const HealthCheckItem = ({entry}: {entry: HealthCheckEntry}) => {
    return <Card>
        <Card.Content header={<>{entry.date} <Icon name='doctor'/></>} />
        <Card.Content description={entry.description} />
        <Card.Content extra>
            <Icon name='heart'/> {entry.healthCheckRating}/3
         </Card.Content>
         <Card.Content>
         {entry.diagnosisCodes && <DiagnosisList codes={entry.diagnosisCodes}/>}
         </Card.Content>
    </Card>;
};

const OccupationalHealthcareItem = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    return <Card>
        <Card.Content header={<>{entry.date} <Icon name='stethoscope'/> {entry.employerName}</>} />
        <Card.Content description={entry.description} />
        {entry.sickLeave && <Card.Content extra>
            <Icon name='calendar minus'/> {entry.sickLeave.startDate}
            <Icon name='calendar plus'/> {entry.sickLeave.endDate}
         </Card.Content>}
         <Card.Content>
         {entry.diagnosisCodes && <DiagnosisList codes={entry.diagnosisCodes}/>}
         </Card.Content>
    </Card>;
};

const DiagnosisList = ({codes}: {codes: string[]}) => {
    const [{ diagnoses }] = useStateValue();
    return <ul>
        {codes.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
    </ul>;
};

export default Patient;
