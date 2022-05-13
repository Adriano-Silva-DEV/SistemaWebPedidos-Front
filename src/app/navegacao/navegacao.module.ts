import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from "./footer/footer.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { MenuModule } from '../menu/menu.module';
import { ProdutoModule } from '../produto/produto.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
@NgModule({
        declarations: [
            MenuComponent,
            HomeComponent,
            NotFoundComponent,
            FooterComponent, 
            MenuLoginComponent
        ],
        imports: [
            CommonModule,
            RouterModule,
           NgbModule,
           MenuModule,
           ProdutoModule,
           MatSliderModule,   
           MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule
        ],
        exports: [
            MenuComponent,
            HomeComponent,
            NotFoundComponent,
            FooterComponent,
            MenuLoginComponent
        ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    export class NavegacaoModule {}