import { IonCheckbox, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react'
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { CompetenceModel } from '../competences/CompetenceModel'
import { NiveauCompModel } from '../competences/NiveauCompModel'

interface Props {
    competence: CompetenceModel,
    addCompetence: Function
}

export const PersonneSelectComp = (props: Props) => {

    const [showSelect, setShowSelect] = useState<boolean>(false)

    const addCompetence = (event: any) => {
        let newNiveauComp : NiveauCompModel = {
            competence : props.competence,
            niveau: event.detail.value
        } 
        props.addCompetence(newNiveauComp)
    }

  return (
    <IonItem>
        <IonCheckbox onIonChange={() => setShowSelect(!showSelect)} slot='start'></IonCheckbox>
        <IonLabel>{props.competence.name}</IonLabel>
        { showSelect && 
            <IonSelect onIonChange={addCompetence} placeholder='niveau'>
                <IonSelectOption value="Débutant">Débutant</IonSelectOption>
                <IonSelectOption value="Confirmé">Confirmé</IonSelectOption>
                <IonSelectOption value="Vétérant">Vétérant</IonSelectOption>
            </IonSelect>
        }
    </IonItem>
  )
}
