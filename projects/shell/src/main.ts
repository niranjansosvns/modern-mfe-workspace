import { initFederation } from '@angular-architects/module-federation';
import { environment } from './environments/environment'; // Standard import path

initFederation({
  "profileMfe": environment.profileMfeUrl // Feeds configuration dynamically
})
  .catch(err => console.error('Error initializing federation', err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
