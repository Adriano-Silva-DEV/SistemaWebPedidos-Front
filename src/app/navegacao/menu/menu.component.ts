import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { Sobre } from 'src/app/sobre/models/sobre.model';
import { environment } from 'src/environments/environment';
import { FornecedorGuard } from '../../fornecedor/services/fornecedor.guard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  localStorage = new LocalStorageUtils();
  badge: number = 0;
  @Input()
  sobre: Sobre;
  @ViewChild('busca')
  busca: ElementRef;
  imagens: string = environment.imgUrl;
  admin: boolean = false;
  exibirMenuAdministrador: boolean = false;
  localStorageUtils = new LocalStorageUtils();

  public isCollapsed: boolean;
  token: string;
  user: any;

  constructor(private router: Router) {
    this.isCollapsed = true;
  }

  ngOnInit(): void {
    this.exibirMenuAdministrador = this.exibirPainelAdmin();
    this.usuarioLogado();
    setInterval(() => {
      this.badge = this.localStorage.obterCarrinho().itemCarrinho.length;
    }, 1000);
 this.sobre = new Sobre();
  }

  buscar() {
    if (
      this.busca.nativeElement.value != 'undefined' &&
      typeof this.busca.nativeElement.value != 'undefined'
    ) {
      this.router.navigate(['/carrinho/busca', this.busca.nativeElement.value]);
    }
  }

  exibirPainelAdmin() {
    if (!this.localStorageUtils.obterTokenUsuario()) return false;

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

  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario();

    if (this.user) {
      this.admin = this.user.claims.find((x) => x.type == 'Produto')
        ? true
        : false;
    }
    return this.token !== null;
  }
}
