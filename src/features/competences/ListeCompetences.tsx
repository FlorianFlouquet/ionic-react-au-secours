import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonToolbar } from '@ionic/react'
import React, { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { competencesService } from './CompetencesService';
import { CompetenceModel } from './CompetenceModel';
import {v4 as uuidv4} from 'uuid';
import { CompCard } from './CompCard';
import { Link } from 'react-router-dom';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

export const ListeCompetences = () => {

    const [competences, setCompetences] = useState<CompetenceModel[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);

    const [newCompetence, setNewCompetence] = useState<CompetenceModel>({
        id: "",
        name: "",
        text: "",
        img: ""
    })

    useEffect(() => {
        competencesService.findAllCompetences().then((response) => setCompetences([...response.data]));
    }, [])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setNewCompetence({
            ...newCompetence, id: uuidv4()
        })
        competencesService.ajouterCompetences(newCompetence).then((res) => setCompetences([...competences, res.data]));
        setShowModal(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCompetence({
            ...newCompetence, [e.target.name] :  e.target.value
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class='ion-text-center'>
                    <IonLabel>Compétences</IonLabel>
                </IonToolbar>
            </IonHeader>
            <IonContent class='ion-padding-top'>
                <IonRow class='ion-justify-content-center'>
                    <IonButton onClick={() => setShowModal(true)}>Ajouter une compétence</IonButton>
                </IonRow>
                <IonModal isOpen={showModal}>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
                        </IonButtons>
                    </IonToolbar>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nom</label>
                            <input type="text" name='name' onChange={handleChange} />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type="text" name='text' onChange={handleChange} />
                        </div>
                        <div>        
                            <label>Image URL</label>
                            <input type="text" name='img' onChange={handleChange} />
                        </div>
                        <IonButton type='submit'>Ajouter</IonButton>
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