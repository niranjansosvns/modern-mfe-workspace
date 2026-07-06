import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    // Directly supply the precise production port endpoint link
    loadChildren: () => 
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.profileMfeUrl,
        exposedModule: './Routes'
      }).then(m => m.PROFILE_ROUTES)
  }
];
