import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserStateService } from 'shared-assets';


@Component({
  selector: 'app-root',
  standalone: true,
  // Add RouterLink and RouterOutlet to your imports array
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shell';
  public userService = inject(UserStateService);
  // Expose the current value to the template
  public username = this.userService.currentUser;

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userService.updateUser(input.value);
  }
}
