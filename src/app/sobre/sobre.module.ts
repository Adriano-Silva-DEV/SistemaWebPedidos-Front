import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { NgBrazil } from "ng-brazil";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgxSpinnerModule } from "ngx-spinner";
import { MenuModule } from "../menu/menu.module";
import { ProdutoRoutingModule } from "../produto/produto.route";
import { EditarComponent } from './editar/editar.component';
import { SobreAppComponent } from './fornecedor.app.component';
import { SobreService } from "./services/sobre.Service";
import { SobreRoutingModule } from './sobre.route';
import {SobreResolve} from './services/sobre.resolve';
import { FornecedorGuard } from "../fornecedor/services/fornecedor.guard";



@NgModule({
  declarations: [
    EditarComponent,
    SobreAppComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ImageCropperModule,
    MenuModule,
    SobreRoutingModule,
    MenuModule
  ],
  providers: [
    SobreService,
    SobreResolve,
    FornecedorGuard

  ],
  schemas: [
  
  ],
  exports:[]
})
export class SobreModule { }
