import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError ,map } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { CategoriaModel } from '../models/categoria';

@Injectable()
export class CategoriaService extends BaseService {

    fornecedor: CategoriaModel = new CategoriaModel();

    constructor(private http: HttpClient) { super() 
    
    }

    obterTodos(): Observable<CategoriaModel[]> {
        let response = this.http.get(this.UrlServiceV1+'/Categorias', this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }
    

    obterPorId(id: string): Observable<CategoriaModel> {
        let response = this.http.get(this.UrlServiceV1+'/Categorias/'+id, this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }

    novaCategoria(categoriaModel: CategoriaModel): Observable<CategoriaModel> {
        let response = this.http.post(this.UrlServiceV1+'/Categorias/salvar', categoriaModel, this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }
 
    atualizarCategoria(categoriaModel: CategoriaModel): Observable<CategoriaModel> {
        let response = this.http.put(this.UrlServiceV1+'/Categorias/atualizar/'+categoriaModel.id, CategoriaModel, this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }

    excluirCategoria(id: string): Observable<CategoriaModel> {
        let response = this.http.delete(this.UrlServiceV1+'/Categorias/remover/'+id,this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
       //   catchError(this.serviceError)
          );
    
    return response;
    }    
}
