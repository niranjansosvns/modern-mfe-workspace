import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'shared-assets'; // Import our generic pluck utility
import { map } from 'rxjs/operators';

export interface UserProfile {
  username: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  // Example method fetching user objects and mapping them strictly to a string array of emails
  getEmailDropdownList() {
    return this.http.get<UserProfile[]>('https://typicode.com').pipe(
      map(users => pluck(users, 'email')) 
    );
  }
}
