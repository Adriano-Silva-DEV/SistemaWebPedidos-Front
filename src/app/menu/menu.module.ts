import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuAdmComponent } from './menu-adm/menu-adm.component';


@NgModule({
  declarations: [
 MenuAdmComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule
  ],
  providers: [ 
  ],
  exports:[MenuAdmComponent]
 
})
export class MenuModule { }
