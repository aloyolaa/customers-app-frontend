import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent {
  courses: string[] = ['TypeScript', 'JavaScript', 'Java'];
  enable = true;

  setEnable(): void {
    this.enable = !this.enable;
  }
}
