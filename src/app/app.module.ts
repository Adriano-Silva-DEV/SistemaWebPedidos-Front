import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.handler.service';
import { ProdutoModule } from './produto/produto.module';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { CategoriaModule } from './categoria/categoria.module';
import { MenuAdmComponent } from './menu/menu-adm/menu-adm.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { SobreModule } from './sobre/sobre.module';


registerLocaleData(localePt)

export const httpInterceptorProviders = 
  { provide : HTTP_INTERCEPTORS, useclass: ErrorInterceptor, multi: true}
;

@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
    FornecedorModule,
    CategoriaModule,
    NgbModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    NgxSpinnerModule,
    HttpClientModule, 
    ProdutoModule,
    NgxSpinnerModule,
    MenuModule,
    SobreModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
   { provide : HTTP_INTERCEPTORS, 
    useClass: ErrorInterceptor, 
    multi: true }
  ],
  exports:[],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {

  getFormattedPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

 }


