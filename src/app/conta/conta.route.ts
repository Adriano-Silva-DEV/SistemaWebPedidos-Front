import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ContaAppComponent } from "./conta.app.component";
import { DadosUsuarioComponent } from "./dados-usuario/dados-usuario.component";
import { EnderecoComponent } from "./endereco/endereco.component";
import { LoginComponent } from "./login/login.component";
import { ContaGuard } from './services/conta.guard';

const contaRouterConfig: Routes = [
    {
        path: '', component: ContaAppComponent,
        children: [
            { path: 'cadastro', component: CadastroComponent,canActivate:[ContaGuard], canDeactivate: [ContaGuard] },
            { path: 'login', component: LoginComponent, canActivate:[ContaGuard] },
            { path: 'endereco', component: EnderecoComponent },
            { path: 'meus-dados', component: DadosUsuarioComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contaRouterConfig)
    ],
    exports: [RouterModule]
})
export class ContaRoutingModule { }