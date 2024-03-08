import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../interfaces/menuItem.interface';


@Component({
  selector: 'shared-card',
  templateUrl: './card.component.html',
  standalone: true,
  styles: `
  div { width: 100%;
         height: 150px;
         margin: 0px;
         }`,
  imports: [CommonModule],
})
export class CardComponent {
 
 
@Input() public itemMenu!: MenuItem;
  

}
