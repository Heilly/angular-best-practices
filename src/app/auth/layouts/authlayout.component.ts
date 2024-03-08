import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authlayout',
  templateUrl: './authlayout.component.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AuthlayoutComponent {}
