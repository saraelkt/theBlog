import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputfield',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './inputfield.component.html',
  styleUrl: './inputfield.component.css',
})
export class InputfieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'text';
  @Input() type: string = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>(); // Émetteur d'événements pour transmettre les données au parent

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value); // Émet la valeur entrée
  }
}
