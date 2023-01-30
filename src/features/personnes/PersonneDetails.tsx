import { IonButton, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PersonneModel } from './PersonneModel'
import { personnesService } from './PersonnesService'

export const PersonneDetails = () => {

    const [personne, setPersonne] = useState<PersonneModel>()

    const [showSelect, setShowSelect] = useState<boolean>(false)

    let { id } = useParams<{ id: string }>()

    useEffect(() => {        
        personnesService.findById(id).then((res) => setPersonne(res.data))
    }, [id])

    const handleChange = (event: any, index: number) => {
        if(personne && personne.competences) {
            let array = [...personne?.competences];
            array[index].niveau = event.detail.value;
            setPersonne({...personne, competences: array})
            personnesService.updatePersonne(personne);
            setShowSelect(false)
        }
    }

  return (
    <IonPage>
        <IonHeader class='ion-padding'>
            <IonLabel class='ion-text-uppercase'>{personne?.familyName} {personne?.surname}</IonLabel>
        </IonHeader>
        <IonCard>
            <img src={personne?.img} />
        </IonCard>
        <IonContent>
            <IonList>
                {personne?.competences.map((competence, index) => (
                    <IonItem key={competence.competence.id}>
                        <IonLabel>{competence.competence.name}</IonLabel>
                        {showSelect ?
                        <IonSelect placeholder={competence.niveau} onIonChange={(event) => handleChange(event, index)}>
                            <IonSelectOption value="Débutant">Débutant</IonSelectOption>
                            <IonSelectOption value="Confirmé">Confirmé</IonSelectOption>
                            <IonSelectOption value="Vétérant">Vétérant</IonSelectOption>
                        </IonSelect>:
                        <IonLabel>{competence.niveau}</IonLabel>
                        }
                        <IonButton onClick={() => setShowSelect(!showSelect)}>Edit</IonButton>
                    </IonItem>
                ))}
            </IonList>
        </IonContent>
    </IonPage>
  )
}
