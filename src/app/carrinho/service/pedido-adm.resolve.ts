import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Pedido } from '../models/pedido';
import { PedidoService } from './pedido.service';


@Injectable()
export class PedidoAdmResolve implements Resolve<Pedido> {

    constructor(private pedidoService: PedidoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.pedidoService.buscarPedidoAdmId(route.params['id']);
    }
}
