import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule], // Corrigé au pluriel
})
export class ButtonComponent implements OnInit {
  @Input() text: string = 'Default Text'; // Ajout d'une valeur par défaut
  @Input() color: string = 'bg-blue-500'; // Ajout d'une classe CSS par défaut
  @Input() type: string = '';
  constructor() {}

  ngOnInit(): void {}
}
