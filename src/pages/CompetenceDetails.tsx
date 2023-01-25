import { IonHeader, IonLabel, IonPage, IonToolbar } from '@ionic/react'

import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { competencesService } from '../services/CompetencesService'
import { CompetenceModel } from '../types/CompetenceModel'

export const CompetenceDetails = () => {

  const [data, setData] = useState<CompetenceModel>()

  let { id } = useParams<{ id: string }>()

  useEffect(() => {
    competencesService.findById(id).then((res) => setData(res.data));
  }, [id])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonLabel>{data?.name}</IonLabel>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  )
}
