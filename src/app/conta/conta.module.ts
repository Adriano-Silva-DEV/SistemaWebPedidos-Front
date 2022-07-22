
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaRoutingModule } from './conta.route';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"
import { ContaAppComponent } from './conta.app.component';
import { ContaService } from './services/conta.service';
import { CustomFormsModule } from 'ng2-validation';
import { ContaGuard } from './services/conta.guard';
import { MenuModule } from '../menu/menu.module';
import { EnderecoComponent } from './endereco/endereco.component';
import { DadosUsuarioComponent } from './dados-usuario/dados-usuario.component';


@NgModule({
  declarations: [
    CadastroComponent,
    LoginComponent,
    ContaAppComponent,
    EnderecoComponent,
    DadosUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ContaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
    MenuModule
  ],
  providers: [
    ContaService,
    ContaGuard
  ]
})
export class ContaModule { }
