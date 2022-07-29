import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosUsuario, Usuario, Endereco } from '../models/usuario';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from '../../services/base.service';

@Injectable()
export class ContaService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  cadastarUsuario(usuario: DadosUsuario): Observable<DadosUsuario> {
    let response = this.http
      .post(
        this.UrlServiceV1 + '/Auth/nova-conta',
        usuario,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  alterarUsuario(usuario: DadosUsuario): Observable<DadosUsuario> {
    let response = this.http
      .put(
        this.UrlServiceV1 + '/Auth/alterar-dados-usuario',
        usuario,
        super.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  login(usuario: DadosUsuario): Observable<DadosUsuario> {
    let response = this.http
      .post(this.UrlServiceV1 + '/Auth/entrar', usuario, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }


  dadosUsuario(): Observable<DadosUsuario> {
    let response = this.http
      .get<DadosUsuario>(this.UrlServiceV1 + '/Auth/dados-usuario',  super.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  obterEnderecoCliente(): Observable<Endereco> {
    return this.http
      .get<Endereco>(
        this.UrlServiceV1 + '/endereco',
        super.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  editarEnderecoCliente(endereco: Endereco): Observable<Endereco> {
    return this.http
      .post<Endereco>(
        this.UrlServiceV1 + '/endereco/editar',
        endereco,
        super.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
