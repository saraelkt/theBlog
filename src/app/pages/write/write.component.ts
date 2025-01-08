import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { WriteSectionComponent } from '../../components/write-section/write-section.component';

@Component({
  selector: 'app-write',
  standalone: true,
  imports: [HeaderComponent, WriteSectionComponent],
  templateUrl: './write.component.html',
  styleUrl: './write.component.css'
})
export class WriteComponent {

}
