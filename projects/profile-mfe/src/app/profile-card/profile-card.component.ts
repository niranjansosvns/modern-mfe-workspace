import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md border border-slate-100 font-sans mt-6">
      <h3 class="text-lg font-bold text-slate-800 mb-2">MFE Control Panel</h3>
      <p class="text-xs text-slate-500 mb-4">Dynamically streaming values from remote servers across endpoints via pluck metrics.</p>

      <!-- Dropdown Select Layout Container -->
      <div class="space-y-1">
        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Select Contact Email</label>
        <select class="w-full px-3 py-2 text-sm bg-white text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option *ngIf="emailsList().length === 0">Loading network paths...</option>
          <option *ngFor="let email of emailsList()" [value]="email">{{ email }}</option>
        </select>
      </div>
    </div>
  `
})
export class ProfileCardComponent implements OnInit {
  private profileService = inject(ProfileService);

  // Use a modern Angular Signal array to bind the stream data to your HTML view reactively
  public emailsList = signal<string[]>([]);

  ngOnInit(): void {
    this.profileService.getEmailDropdownList().subscribe({
      next: (emails) => {
        console.log('[Profile MFE] Plucked email listing successfully:', emails);
        this.emailsList.set(emails); // Populates the HTML dropdown automatically
      },
      error: (err) => console.error('[Profile MFE] Data fetch operation failed:', err)
    });
  }
}
