import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  // Global States shared between Shell and Remotes
  public currentUser = signal<string>('Guest User');
  public authToken = signal<string | null>('MOCK_JWT_SECRET_TOKEN_XYZ');
  public isNetworkLoading = signal<boolean>(false); // Tracks if any API call is pending

  updateUser(name: string) {
    this.currentUser.set(name);
  }

  setLoading(state: boolean) {
    this.isNetworkLoading.set(state);
  }
}
