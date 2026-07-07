import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root' // Crucial: Makes it a singleton token
})
export class UserStateService {
  // Using an Angular Signal to track a username reactively
  public currentUser = signal<string>('Guest User');
  public authToken = signal<string | null>('MOCK_JWT_SECRET_TOKEN_XYZ');
  public isNetworkLoading = signal<boolean>(false);

  updateUser(name: string) {
    this.currentUser.set(name);
  }

  setLoading(state : boolean){
    this.isNetworkLoading.set(state);
  }
}
