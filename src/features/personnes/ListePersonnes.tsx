import { IonButton, IonButtons, IonCard, IonCheckbox, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonToolbar } from '@ionic/react'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
import { IonContext } from '@ionic/react/dist/types/contexts/IonContext'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CompetenceModel } from '../competences/CompetenceModel'
import { competencesService } from '../competences/CompetencesService'
import { NiveauCompModel } from '../competences/NiveauCompModel'
import { PersonneModel } from './PersonneModel'
import { PersonneSelectComp } from './PersonneSelectComp'
import { personnesService } from './PersonnesService'

export const ListePersonnes = () => {

  const [personnes, setPersonnes] = useState<PersonneModel[]>()
  const [competences, setCompetences] = useState<CompetenceModel[]>()

  const [showModal, setShowModal] = useState<boolean>(false);

  const [newPersonne, setNewPersonne] = useState<PersonneModel>({
    id: "",
    familyName: "",
    surname: "",
    img: "",
    competences: []
  })

  useEffect(() => {
    personnesService.findAllPersonnes().then((res) => setPersonnes(res.data));
  }, [])

  useEffect(() => {
    competencesService.findAllCompetences().then((res) => setCompetences(res.data));
  }, [personnes])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPersonne({
      ...newPersonne, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    personnesService.ajouterPersonne(newPersonne).then((res) => { if(personnes != undefined) setPersonnes([...personnes, res.data]) });
    setShowModal(false)
  }

  const addCompetence = (competence : NiveauCompModel) => {
    let array = [...newPersonne.competences];
    array.push(competence);
    setNewPersonne({...newPersonne, competences: array});
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class='ion-text-center'>
          <IonLabel>Personnes</IonLabel>
        </IonToolbar>
      </IonHeader>
      <IonItem>
        <IonRow class='ion-justify-content-center'>
          <IonButton onClick={() => setShowModal(true)}>Ajouter une personne</IonButton>
        </IonRow>
        <IonModal isOpen={showModal}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonItem>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Prenom</label>
                <input name='surname' onChange={handleChange}/>
              </div>
              <div>
                <label>Nom</label>
                <input name='familyName' onChange={handleChange}/>
              </div>
              <div>
                <label>Image URL</label>
                <input name='img' onChange={handleChange}/>
              </div>
              <IonLabel>Liste des compétences: </IonLabel>
              {/* selection des compétences */}
              <div>
                {competences?.map((competence) => (
                  <PersonneSelectComp competence={competence} addCompetence={addCompetence} key={competence.id}/>
                ))}
              </div>
              <IonButton type='submit'>Ajouter</IonButton>
            </form>
          </IonItem>
        </IonModal>
      </IonItem>
      <IonContent>
        <IonList>
          {personnes?.map((item) => (
            <Link key={item.id} to={`/personne-details/${item.id}`}>
              <IonCard>
                <IonItem>
                  <IonLabel>{item.familyName}</IonLabel>
                  <IonLabel class='ion-text-end'>{item.surname}</IonLabel>
                </IonItem>
              </IonCard>
            </Link>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}