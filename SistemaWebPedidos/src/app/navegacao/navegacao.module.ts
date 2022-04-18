import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from "./footer/footer.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
        declarations: [
            MenuComponent,
            HomeComponent,
            NotFoundComponent,
            FooterComponent
        ],
        imports: [
            CommonModule,
            RouterModule,
           NgbModule,
        ],
        exports: [
            MenuComponent,
            HomeComponent,
            NotFoundComponent,
            FooterComponent
        ]
    })
    export class NavegacaoModule {}