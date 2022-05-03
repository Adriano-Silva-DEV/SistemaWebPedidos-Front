import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DadosUsuario, Usuario } from "../models/usuario";
import { Observable } from 'rxjs';
import {  map, catchError } from 'rxjs/operators';
import { BaseService } from '../../services/base.service';

@Injectable()
export class ContaService extends BaseService{
    constructor( private http: HttpClient){
      super();
    }


  cadastarUsuario( usuario: DadosUsuario): Observable<DadosUsuario>
  {
    let response = this.http.post(this.UrlServiceV1+'/Auth/nova-conta',usuario, this.ObterHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
      );

return response;
  }

  login( usuario: DadosUsuario): Observable<DadosUsuario>
  {
    let response = this.http.post(this.UrlServiceV1+'/Auth/entrar',usuario, this.ObterHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
      );
      return response;
  }
}