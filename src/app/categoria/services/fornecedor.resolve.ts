import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CategoriaModel } from '../models/categoria';
import { CategoriaService } from "./categoriaService";




@Injectable()
export class CategoriaResolve implements Resolve<CategoriaModel>{
   
   
    constructor(private categoriaService: CategoriaService){}

   
   
    resolve(route: ActivatedRouteSnapshot) {
      return this.categoriaService.obterPorId(route.params['id']);
    }
    
}