import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStateService } from 'shared-assets';
import { Router , RouterLink} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  // Explicitly import ReactiveFormsModule for formGroup control properties
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private userService = inject(UserStateService);
  private router = inject(Router);

  // Expose the global state signal so we can display context updates
  public authToken = this.userService.authToken;
  public loginForm!: FormGroup;
  private formSub!: Subscription;

  ngOnInit(): void {
    // 1. Structural Form definitions setup
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    // 2. Map form streams directly into your state Signals
    this.formSub = this.loginForm.valueChanges.subscribe(() => {
      const emailValue = this.loginForm.get('email')?.value || '';
      const isFormValid = this.loginForm.valid;
      
      // Update the signal reactively on every keystroke
      this.userService.updateLiveForm(emailValue, isFormValid);
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('[Login Form] Form Payload submitted successfully:', this.loginForm.value);
      
      // Trigger our global auth state to log the user in
      this.userService.login();
      
      // Dynamically redirect the authenticated user straight to the protected Profile MFE
      this.router.navigate(['/profile']);
    } else {
      // Mark all fields as touched to trigger Tailwind validation messages if empty
      this.loginForm.markAllAsTouched();
    }
  }
}
