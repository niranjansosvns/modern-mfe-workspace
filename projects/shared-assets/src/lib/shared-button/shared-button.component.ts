import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-shared-button',
  standalone: true,
  imports: [],
  template: `
    <button [style.background-color]="color" class="custom-shared-btn" (click)="btnClick.emit($event)">
      {{ label }}
    </button>
  `,
  styles: [`
    .custom-shared-btn {
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: opacity 0.2s ease;
    }
    .custom-shared-btn:hover {
      opacity: 0.9;
    }
  `]
})
export class SharedButtonComponent {
  @Input() label: string = 'Click Me';
  @Input() color: string = '#38bdf8'; // Default sky blue color
  @Output() btnClick = new EventEmitter<MouseEvent>();
}
