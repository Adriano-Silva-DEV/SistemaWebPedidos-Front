import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Pedido } from '../models/pedido';
import { PedidoService } from './pedido.service';


@Injectable()
export class PedidoResolve implements Resolve<Pedido> {

    constructor(private pedidoService: PedidoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.pedidoService.buscarPedidoId(route.params['id']);
    }
}