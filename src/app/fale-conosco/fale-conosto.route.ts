import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaleConoscoComponent } from './fale-conosco.component';

const faleConostoRouterConfig: Routes = [
    {
        path: '', component: FaleConoscoComponent,                
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(faleConostoRouterConfig)
    ],
    exports: [RouterModule]
})
export class FaleConostoRoutingModule { }