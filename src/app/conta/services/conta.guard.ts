import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";
import { CadastroComponent } from '../cadastro/cadastro.component';
import { LocalStorageUtils } from "src/app/services/localstorage";

@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate{
   
    localStorageUtils = new LocalStorageUtils();

    constructor(private router : Router) {}

    canDeactivate(component: CadastroComponent){
       
        if ( component.mudancasNaoSalvas){
            return window.confirm("Existem mudanças não salvas, deseja sair?");
        }
            return true;
    }
    
    canActivate() {
        if(this.localStorageUtils.obterTokenUsuario())
        {
         this.router.navigate(['/home']);
        }
       return true;
    }
}