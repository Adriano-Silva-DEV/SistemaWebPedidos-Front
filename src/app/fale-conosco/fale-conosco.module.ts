import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaleConoscoComponent } from './fale-conosco.component';
import { FaleConostoRoutingModule } from './fale-conosto.route';
import { MenuModule } from '../menu/menu.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SobreModule } from '../sobre/sobre.module';
@NgModule({
  imports: [
    CommonModule,
    FaleConostoRoutingModule,
    MenuModule,
    MatSliderModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatTooltipModule,
    SobreModule
  ],
  declarations: [FaleConoscoComponent],
  exports:[
    FaleConoscoComponent
  ]
})
export class FaleConoscoModule {}
