import { IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonToolbar } from '@ionic/react'

import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { competencesService } from './CompetencesService'
import { CompetenceModel } from './CompetenceModel'
import { PersonneModel } from '../personnes/PersonneModel'
import { personnesService } from '../personnes/PersonnesService'
import { Link } from 'react-router-dom'

export const CompetenceDetails = () => {

  const [data, setData] = useState<CompetenceModel>()

  const [allPersonnes, setAllPersonnes] = useState<PersonneModel[]>([])

  const [bonnesPersonnes, setBonnesPersonnes] = useState<PersonneModel[]>([])


  let { id } = useParams<{ id: string }>()

  useEffect(() => {
    competencesService.findById(id).then((res) => setData(res.data));
  }, [id])

  useEffect(() => {
    personnesService.findAllPersonnes().then((res) => setAllPersonnes(res.data))
  }, [data])

  useEffect(() => {
    let array : PersonneModel[] = [];
    allPersonnes.forEach(element => {
      if(element.competences.some(item => item.id == data?.id)) {
        array.push(element);
      }
    });
    setBonnesPersonnes([...array])
  }, [allPersonnes])

  const navigate = () => {
    console.log("oui");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonLabel>{data?.name}</IonLabel>
        </IonToolbar>
      </IonHeader>
      <IonCard>
        <IonCardHeader>
          <img src={data?.img} />
          <IonCardSubtitle>{data?.text}</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
      <IonContent>
        <IonLabel>Liste des utilisateurs maitrisants cette compétence :</IonLabel>
        <IonList>
          {bonnesPersonnes.map((personne) => (
            <Link key={personne.id} to={{pathname: `/personne-details/${personne.id}`, state: personne}} >
              <IonLabel>{personne.surname}</IonLabel>
              <IonLabel>{personne.familyName}</IonLabel>
            </Link>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
