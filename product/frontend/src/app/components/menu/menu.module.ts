import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule],
  exports: [MenuComponent, MatSidenavModule],
  providers: [],
})
export class MenuModule {}
