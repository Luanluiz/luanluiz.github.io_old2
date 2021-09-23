import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@app/modules/menus/navigation.model';
import { UsuarioGridComponent } from '@app/modules/cadastros/usuarios/usuario.grid.component';
// import { UsuarioModule } from '@app/modules/cadastros/usuario.module';

export const ROUTES_USUARIOS: Routes = [
    {
        path: 'usuario',
        component: UsuarioGridComponent,
        // data: {
        //     title: 'Cadastro de usuários',
        //     breadcrumbs: [
        //         {
        //             text: 'Cadastro de usuários',
        //             active: true,
        //         },
        //     ],
        // } as SBRouteData,
        // canActivate: [],
    },
];

// @NgModule({
//     // imports: [RouterModule.forChild(ROUTES_USUARIOS)],
//     // exports: [RouterModule],
// })
// export class UsuarioRoutingModule {}
