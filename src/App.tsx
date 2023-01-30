import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ListeCompetences } from './features/competences/ListeCompetences';
import { ListePersonnes} from './features/personnes/ListePersonnes';
import { CompetenceDetails } from './features/competences/CompetenceDetails';
import { body, clipboard, egg, happy, logoBuffer, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/app.css';
import { PersonneDetails } from './features/personnes/PersonneDetails';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/competences">
            <ListeCompetences />
          </Route>
          <Route path="/profiles">
            <ListePersonnes />
          </Route>
          <Route path="/competence-details/:id">
            <CompetenceDetails />
          </Route>
          <Route path="/personne-details/:id">
            <PersonneDetails />
          </Route>
          <Route exact path="/">
            <Redirect to="/competences" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot='bottom'>
          <IonTabButton tab='competences' href='/competences'>
            <IonIcon icon={clipboard} />
            <IonLabel>Compétences</IonLabel>
          </IonTabButton>
          <IonTabButton tab='profiles' href='/profiles'>
            <IonIcon icon={happy} />
            <IonLabel>Profiles</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      
    </IonReactRouter>
  </IonApp>
);

export default App;
