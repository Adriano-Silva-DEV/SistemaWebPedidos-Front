import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SobreService } from "./sobre.Service";
import { Sobre } from '../models/sobre.model';



@Injectable()
export class SobreResolve implements Resolve<Sobre>{
   
   
    constructor(private sobreService: SobreService){}

   
   
    resolve(route: ActivatedRouteSnapshot) {
      return this.sobreService.obter();
    }
    
}