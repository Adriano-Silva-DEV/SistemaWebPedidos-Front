import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Pedido } from '../models/pedido';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-pedido-usuario-view',
  templateUrl: './pedido-usuario-view.component.html',
  styleUrls: ['./pedido-usuario-view.component.css'],
})
export class PedidoUsuarioViewComponent implements OnInit {
  
  pedido: Pedido;
  imagens: string = environment.imgUrl;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private pedidoService: PedidoService
  ) {
    this.pedido = this.route.snapshot.data['pedido'];
  }

  ngOnInit() {
   console.log(this.pedido)
  }

  
  totalItem(quantidade, valor) {
    return quantidade * valor;
  }
  
}
