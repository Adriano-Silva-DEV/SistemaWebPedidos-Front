import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from "src/app/fornecedor/models/fornecedor";
import { Endereco } from '../../fornecedor/models/endereco';

@Injectable()
export class PedidoService extends BaseService {

    constructor(private http: HttpClient) { super() }

  /*   obterTodos(): Observable<Produto[]> {
        return this.http
            .get<Produto[]>(this.UrlServiceV1 + "/Produtos", super.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                );
    }

    obterEnderecoClientePorId(id: string): Observable<Endereco> {
        return this.http
            .get<Produto>(this.UrlServiceV1 + "/produtos/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
                );
    } 
*/

}
