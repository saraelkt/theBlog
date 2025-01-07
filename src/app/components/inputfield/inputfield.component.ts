import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inputfield',
  imports: [],
  standalone: true,
  templateUrl: './inputfield.component.html',
  styleUrl: './inputfield.component.css',
})
export class InputfieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'text';
  @Input() type: string = '';
  @Input() value: string = '';
}
