import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";
import { LocalStorageUtils } from "src/app/services/localstorage";
import { Pedido } from "./models/pedido";

@Injectable()
export class CarrinhoGuard implements CanDeactivate<Pedido>, CanActivate{
   
    localStorageUtils = new LocalStorageUtils();

    constructor(private router : Router) {}

    canDeactivate(component: Pedido){
            return true;
    }
    
    canActivate() {
        if(!this.localStorageUtils.obterTokenUsuario())
        {
         this.router.navigate(['/conta/login']);
        }
       return true;
    }
}