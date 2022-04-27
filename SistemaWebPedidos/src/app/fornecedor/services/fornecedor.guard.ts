import { Injectable } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageUtils } from '../../services/localstorage';

@Injectable()
export class FornecedorGuard implements CanActivate {
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {}

  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.localStorageUtils.obterTokenUsuario())
      this.router.navigate(['/conta/login']);

    let user = this.localStorageUtils.obterUsuario();
    let claim: any = routeAc.data[0];

    if (claim !== undefined) {
      let claim = routeAc.data[0]['claim'];

      if (claim) {
        if (!user.claims) {
          this.acessoNegado();
        }

        let userClaims = user.claims.find((x) => x.type === claim.nome);

        if (!userClaims) {
          this.acessoNegado();
        }

        let valoresClaims = userClaims.value as string;

        if (!valoresClaims.includes(claim.valor)) {
          this.acessoNegado();
        }
      }
    }

    return true;
  }

  acessoNegado() {
    this.router.navigate(['/acesso-negado']);
  }
}
