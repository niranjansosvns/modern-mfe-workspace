import { Injectable, signal } from '@angular/core';


export interface LoginFormState {
  email: string;
  isFormValid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  // Global States shared between Shell and Remotes
  public currentUser = signal<string>('Guest User');
  public authToken = signal<string | null>('MOCK_JWT_SECRET_TOKEN_XYZ');
  public isNetworkLoading = signal<boolean>(false); // Tracks if any API call is pending

   // New Signal tracking the raw state of our input field data reactively
  public liveFormState = signal<LoginFormState>({ email: '', isFormValid: false });

  updateLiveForm(email: string, isValid: boolean) {
    this.liveFormState.set({ email, isFormValid: isValid });
  }

  updateUser(name: string) {
    this.currentUser.set(name);
  }

  setLoading(state: boolean) {
    this.isNetworkLoading.set(state);
  }

  // Login action: Generates a mock authorization token
  login() {
    this.authToken.set('MOCK_JWT_SECRET_TOKEN_XYZ');
    this.currentUser.set('Verified Member');
  }

  // Logout action: Wipes the token and clears the security guard
  logout() {
    this.authToken.set(null);
    this.currentUser.set('Guest User');
  }
}
