import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from 'src/app/conta/services/conta.service';
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { Pedido } from '../models/pedido';
import { PedidoService } from '../service/pedido.service';
import { Pagination } from '../models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-gerencia-pedido',
  templateUrl: './lista-gerencia-pedido.component.html',
  styleUrls: ['./lista-gerencia-pedido.component.css']
})
export class ListaGerenciaPedidoComponent implements OnInit {

  localStorageUtils = new LocalStorageUtils()

  pedidos: Pedido [] = [];
  pagination: Pagination = new Pagination();
  paginaAtual:number;
  totalItensPorPagina:number = 5;

  constructor( private router: Router,
    private route: ActivatedRoute,
    private contaService: ContaService,
    private toastr: ToastrService,private pedidoService: PedidoService, private spinner: NgxSpinnerService) { 

    }

  async  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paginaAtual = params['pagina'];
      this.buscarPedidos(this.paginaAtual)
  });
 }

  buscarPedidos(paginaAtual: number){
    this.spinner.show();

   
    let skip = paginaAtual == 1 || !paginaAtual  ? 0 : this.totalItensPorPagina * (paginaAtual - 1);

    this.pedidoService.buscarTodos(skip, this.totalItensPorPagina ).subscribe(
      sucesso => {this.pedidos = sucesso;
      if (this.pedidos.length > 0)
           this.pagination = [...this.pedidos].pop().pagination;
           this.spinner.hide();
      },
      falha => { this.toastr.error('Ops Ocorreu um erro')
      this.spinner.hide();
      if (falha.status == 401 || falha.status == 402 || falha.status == 403  ){
        this.contaService.localStorage.limparDadosLocaisUsuario();
        this.toastr.error('FAça login novamente na aplicação')
        this.router.navigate(['/conta/login']);      
      }
  });
}


}
