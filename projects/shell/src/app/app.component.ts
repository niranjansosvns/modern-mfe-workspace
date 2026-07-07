import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserStateService } from 'shared-assets'; // Import full service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public userService = inject(UserStateService); // Exposed public link
  public username = this.userService.currentUser;

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userService.updateUser(input.value);
  }
}
