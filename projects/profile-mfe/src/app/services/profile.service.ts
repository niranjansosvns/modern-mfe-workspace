import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'shared-assets'; // Import our custom generic pluck utility
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Maps the structural API envelope payload wrapper returning from dummyjson.com
export interface DummyJsonUsersResponse {
  users: UserProfile[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  getEmailDropdownList(): Observable<string[]> {
    return this.http.get<DummyJsonUsersResponse>('https://dummyjson.com/users').pipe(
      // Step A: Extract the clean array property out of the envelope payload wrapper
      map(response => response.users),
      // Step B: Apply our type-safe pluck utility directly onto the extracted array
      map(usersArray => pluck(usersArray, 'email'))
    );
  }
}
