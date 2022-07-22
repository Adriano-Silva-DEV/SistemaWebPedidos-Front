import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from "src/app/fornecedor/models/fornecedor";
import { Endereco } from '../../fornecedor/models/endereco';
import { Pedido } from "../models/pedido";

@Injectable()
export class PedidoService extends BaseService {

    constructor(private http: HttpClient) { super() }

     processar(pedido: Pedido): Observable<Pedido> {
        return this.http
            .post<Pedido>(this.UrlServiceV1 + "/Pedido/processar",pedido, super.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                );
    }

    buscarUserId(id): Observable<Pedido[]> {
        return this.http
            .get<Pedido>(this.UrlServiceV1 + "/Pedido/userId/"+id, super.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                );
    }

    buscarNumeroTotalPedidos(id): Observable<number> {
        return this.http
            .get<number>(this.UrlServiceV1 + "/Pedido/userId/"+id, super.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                );
    }

    buscarPedidoId(id): Observable<Pedido> {
        return this.http
            .get<Pedido>(this.UrlServiceV1 + "/Pedido/"+id, super.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                );
    }

    buscarTodos(skip: number, take: number): Observable<Pedido[]> {
        return this.http
            .get<Pedido[]>(this.UrlServiceV1 + `/Pedido?skip=${skip}&take${take}`, super.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                );
    }

    atualizarStatus(status, id): Observable<Pedido> {
        return this.http
            .put<Pedido>(this.UrlServiceV1 + `/Pedido/atualizar/status/${id}`, status, super.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                );
    }
}
