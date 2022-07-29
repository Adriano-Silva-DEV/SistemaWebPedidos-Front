import { Usuario } from './../../conta/models/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DadosUsuario } from 'src/app/conta/models/usuario';
import { ContaService } from 'src/app/conta/services/conta.service';
import { environment } from 'src/environments/environment';
import { Pedido } from '../models/pedido';
import { Status } from '../models/status';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-gerencia-pedido-view',
  templateUrl: './gerencia-pedido-view.component.html',
  styleUrls: ['./gerencia-pedido-view.component.css']
})
export class GerenciaPedidoViewComponent implements OnInit {
  pedido: Pedido;
  imagens: string = environment.imgUrl;

  dadosCliente:DadosUsuario = new DadosUsuario();

  status : Status[] =  [{
    id: 1,
    nome: 'Em processamento'
  },{
    id: 2,
    nome: 'Saiu para Entrega'
  },{
    id: 3,
    nome: 'Entregue'
  }
];

selectStatus;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private pedidoService: PedidoService,
    private spinner: NgxSpinnerService,
    private contaService: ContaService,
  ) {
    this.pedido = this.route.snapshot.data['pedido'];
  }

 async ngOnInit() {
   console.log(this.pedido);
   this.selectStatus = this.status.find( s => s.nome == this.pedido.status);
  await  this.obterDadosUsuario();
  }


  totalItem(quantidade, valor) {
    return quantidade * valor;
  }


  mudarStatusPedido(){
    this.spinner.show();

    this.selectStatus = this.status.find( s => s.id == this.selectStatus.id);

    this.pedidoService.atualizarStatus(this.selectStatus, this.pedido.id).subscribe(
      sucesso => {this.pedido = sucesso;
           this.spinner.hide();
           this.toastr.success('Status Atualizado com sucesso!')
      },
      falha => {
        this.toastr.error('Ops Ocorreu um erro')
      this.spinner.hide();
      if (falha.status == 401 || falha.status == 402 || falha.status == 403  ){
        this.contaService.localStorage.limparDadosLocaisUsuario();
        this.toastr.error('FAça login novamente na aplicação')
        this.router.navigate(['/conta/login']);
      }
  });
}

async obterDadosUsuario(){
this.dadosCliente =  await this.pedidoService.dadosUsuario(this.pedido.usuarioId).toPromise();

}

}
