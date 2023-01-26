import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { CompetenceModel } from './CompetenceModel'

interface props {
    item: CompetenceModel
}

export const CompCard = (props: props) => {
  return (
    <IonCard>
        <img src={props.item.img} />
        <IonCardHeader>
            <IonCardTitle>{props.item.name}</IonCardTitle>
            <IonCardSubtitle>{props.item.text}</IonCardSubtitle>
        </IonCardHeader>
    </IonCard>
  )
}
