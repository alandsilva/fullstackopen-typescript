import axios from 'axios';
import React from 'react';
import {
    useParams
  } from 'react-router-dom';
import { useStateValue, setPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient as PatientType, Gender, Entry } from "../types";
import { Icon } from 'semantic-ui-react';


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
    return <div>
        <p>{entry.date} {entry.description}</p>
        <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnostic) => <li key={diagnostic}>{diagnostic}</li>)}
        </ul>
        </div>;
};

export default Patient;
