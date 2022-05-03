import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError ,map } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { Sobre } from '../models/sobre.model';

@Injectable()
export class SobreService extends BaseService {

    constructor(private http: HttpClient) { super() 
    
    }

    obter(): Observable<Sobre> {
        let response = this.http.get(this.UrlServiceV1+'/Sobre', this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }
    
    atualizarSobre(sobre: Sobre): Observable<Sobre> {
        let response = this.http.put(this.UrlServiceV1+'/Sobre/salvar/',sobre, this.ObterAuthHeaderJson())
        .pipe(
          map(this.extractData),
          catchError(this.serviceError)
          );
    
    return response;
    }
   
}
