import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/services/localstorage';


@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent {

  token: string = "";
  user: any;
  email: string = "";
  nome : string = "";
  localStorageUtils = new LocalStorageUtils();
  admin: boolean;

  badge: number = 0;
  constructor(private router: Router) {  }

  ngOnInit(): void {
    setInterval(() => {
      
      if (this.  localStorageUtils.obterCarrinho())
      this.badge = this.  localStorageUtils.obterCarrinho().itemCarrinho.length;
      else {
        this.badge = 0;
      }
    
    }, 1000);

  }


  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario();

    if (this.user){
      this.email = this.user.email;
        this.nome = this.user.nome; 
        this.admin = this.user.claims.find((x) => x.type == 'Produto')
        ? true
        : false;  
    }

    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['/home']);
  }


  
}
