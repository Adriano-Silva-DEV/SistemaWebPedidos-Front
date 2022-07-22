import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { PedidoService } from '../service/pedido.service';
import { Pedido } from '../models/pedido';
import { ContaService } from 'src/app/conta/services/conta.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedido-usuario',
  templateUrl: './pedido-usuario.component.html',
  styleUrls: ['./pedido-usuario.component.css']
})
export class PedidoUsuarioComponent implements OnInit {

  localStorageUtils = new LocalStorageUtils()

  pedidos: Pedido [] = [];

  constructor( private router: Router,
    private contaService: ContaService,
    private toastr: ToastrService,private pedidoService: PedidoService) { }

  ngOnInit() {
    this.buscarPedidosUsuario()
  }

  buscarPedidosUsuario(){
    let usuario  = this.localStorageUtils.obterUsuario();

    this.pedidoService.buscarUserId(usuario.id).subscribe(
      sucesso => {this.pedidos = sucesso; },
      falha => { this.toastr.error('Sessão expirada')
      if (falha.status == 401 || falha.status == 402 || falha.status == 403  ){
        this.contaService.localStorage.limparDadosLocaisUsuario();
        this.router.navigate(['/conta/login'])
      }
  });
}
}
