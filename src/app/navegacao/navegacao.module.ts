import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from "./footer/footer.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { MenuModule } from '../menu/menu.module';
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
           MenuModule
        ],
        exports: [
            MenuComponent,
            HomeComponent,
            NotFoundComponent,
            FooterComponent,
            MenuLoginComponent
        ]
    })
    export class NavegacaoModule {}