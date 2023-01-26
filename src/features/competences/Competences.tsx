import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonToolbar } from '@ionic/react'
import React, { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { competencesService } from './CompetencesService';
import { CompetenceModel } from './CompetenceModel';
import {v4 as uuidv4} from 'uuid';
import { CompCard } from './CompCard';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { Link } from 'react-router-dom';

export const Competences = () => {

    const [competences, setCompetences] = useState<CompetenceModel[]>([]);

    const [newCompetence, setNewCompetence] = useState<CompetenceModel>({
        id: "",
        name: "",
        text: "",
        img: ""
    })

    const modal = useRef<HTMLIonModalElement>(null);

    useEffect(() => {
        competencesService.findAllCompetences().then((response) => setCompetences([...response.data]));
    }, [])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setNewCompetence({
            ...newCompetence, id: uuidv4()
        })
        competencesService.ajouterCompetences(newCompetence).then((res) => setCompetences([...competences, res.data]));
        modal.current?.dismiss();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCompetence({
            ...newCompetence, [e.target.name] :  e.target.value
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonLabel>Compétences</IonLabel>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton id='open-modal'>Ajouter une compétence</IonButton>
                <IonModal ref={modal} trigger='open-modal'>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                    </IonToolbar>
                    <form onSubmit={handleSubmit}>
                        <label>Nom</label>
                        <input type="text" name='name' onChange={handleChange} />
                        <label>Description</label>
                        <input type="text" name='text' onChange={handleChange} />
                        <label>Image URL</label>
                        <input type="text" name='img' onChange={handleChange} />
                        <button type='submit'>Ajouter</button>
                    </form>
                </IonModal>
                <IonList>
                    {competences && competences.map((item) => (
                        <Link key={item.id} to={`/competence-details/${item.id}`}>
                            <CompCard item={item} />
                        </Link>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )
}