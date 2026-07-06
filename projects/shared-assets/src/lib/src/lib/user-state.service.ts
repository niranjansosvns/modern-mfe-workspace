import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root' // Crucial: Makes it a singleton token
})
export class UserStateService {
  // Using an Angular Signal to track a username reactively
  public currentUser = signal<string>('Guest User');

  updateUser(name: string) {
    this.currentUser.set(name);
  }
}
