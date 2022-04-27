import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError ,map } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from '../models/fornecedor';

@Injectable()
export class FornecedorService extends BaseService {

    fornecedor: Fornecedor = new Fornecedor();

    constructor(private http: HttpClient) { super() 
    
        this.fornecedor.nome = "Teste Fake"
        this.fornecedor.documento = "32165498754"
        this.fornecedor.ativo = true
        this.fornecedor.tipoFornecedor = 1
    }

    obterTodos(): Observable<Fornecedor[]> {
        let response = this.http.get(this.UrlServiceV1+'/Fornecedores', this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }
    

    obterPorId(id: string): Observable<Fornecedor> {
        let response = this.http.get(this.UrlServiceV1+'/Fornecedores/'+id, this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }

    novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        let response = this.http.post(this.UrlServiceV1+'/Fornecedores/salvar', fornecedor, this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }
 
    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        let response = this.http.put(this.UrlServiceV1+'/Fornecedores/atualizar/'+fornecedor.id, fornecedor, this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }

    excluirFornecedor(id: string): Observable<Fornecedor> {
        let response = this.http.delete(this.UrlServiceV1+'/Fornecedores/remover/'+id,this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }    
}
