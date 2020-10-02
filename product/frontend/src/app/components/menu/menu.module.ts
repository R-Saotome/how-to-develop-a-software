import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, MatListModule, MatIconModule],
  exports: [MenuComponent],
  providers: [],
})
export class MenuModule {}
