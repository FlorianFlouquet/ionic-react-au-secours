import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PersonneModel } from './PersonneModel'
import { personnesService } from './PersonnesService'

export const ListePersonnes = () => {

  const [data, setData] = useState<PersonneModel[]>()

  useEffect(() => {
    personnesService.findAllPersonnes().then((res) => setData(res.data))
  })

  return (
    <IonPage>
      <IonLabel>Liste des personnes</IonLabel>
      <IonContent>
        <IonList>
          {data?.map((item) => (
            <Link key={item.id} to={`/personne-details/${item.id}`}>
              <IonLabel>{item.familyName}</IonLabel>
              <IonLabel>{item.surname}</IonLabel>
            </Link>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}