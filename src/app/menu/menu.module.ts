import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuAdmComponent } from './menu-adm/menu-adm.component';
import { MenuCategoriaComponent } from './menu-categoria/menu-categoria.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';


@NgModule({
  declarations: [
 MenuAdmComponent,
 MenuCategoriaComponent,
 MenuUsuarioComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule,
   NgbModule
  ],
  providers: [ 
  ],
  exports:[MenuAdmComponent, MenuCategoriaComponent, MenuUsuarioComponent]
 
})
export class MenuModule { }
