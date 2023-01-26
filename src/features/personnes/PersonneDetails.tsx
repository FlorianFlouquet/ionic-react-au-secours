import { IonLabel, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PersonneModel } from './PersonneModel'
import { personnesService } from './PersonnesService'

export const PersonneDetails = () => {

    const [personne, setPersonne] = useState<PersonneModel>()

    let { id } = useParams<{ id: string }>()

    useEffect(() => {
        personnesService.findById(id).then((res) => setPersonne(res.data))
    }, [])

  return (
    <IonPage>
        <IonLabel>{personne?.familyName} {personne?.surname}</IonLabel>
    </IonPage>
  )
}
