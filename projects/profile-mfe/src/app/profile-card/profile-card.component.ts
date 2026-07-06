import { Component, inject } from '@angular/core';
import { UserStateService , SharedButtonComponent} from 'shared-assets';

@Component({
  selector: 'app-profile-card',
  imports: [SharedButtonComponent], 
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
public userService = inject(UserStateService);
resetUser() {
    this.userService.updateUser('Guest User');
  }
}
