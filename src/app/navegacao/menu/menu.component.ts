import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { FornecedorGuard } from '../../fornecedor/services/fornecedor.guard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  exibirMenuAdministrador : boolean = false;
  localStorageUtils = new LocalStorageUtils();
  
    public isCollapsed: boolean;
    
    constructor(private router: Router ) {
      this.isCollapsed = true;
    }
  
  
    ngOnInit(): void {
      this.exibirMenuAdministrador = this.exibirPainelAdmin();
  }


  exibirPainelAdmin(){
    if (!this.localStorageUtils.obterTokenUsuario())
        return false;

    let user = this.localStorageUtils.obterUsuario();

        if (!user.claims) {
          return false;
        }

        let userClaims = user.claims.find((x) => x.type === 'Fornecedor');

        if (!userClaims) {
          return false;
        }
    
        return true;

  }

 
  
}