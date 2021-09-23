import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/modules/login/auth.guard';
import { LoginComponent } from '@app/modules/login/login.component';
import { MenuEsquerdoComponent } from '@app/modules/menus/menu-esquerdo.component';

const routes: Routes = [
    {
        path: '',
        component: MenuEsquerdoComponent,
        canActivate: [AuthGuard],
        children: [

            {
                path: 'cadastros',
                loadChildren: () =>
                    import('./modules/cadastros/usuario.module').then(m => m.UsuarioModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate: [AuthGuard]
            },

        ],
    },

    { path: 'login', component: LoginComponent, data: { reuse: false },  },

    // {
    //     path: 'auth',
    //     loadChildren: () =>
    //         import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    // },
    // {
    //     path: 'error',
    //     loadChildren: () =>
    //         import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    // },
    // {
    //     path: 'tables',
    //     loadChildren: () =>
    //         import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    // },
    // {
    //     path: 'version',
    //     loadChildren: () =>
    //         import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    // },
    // {
    //     path: '**',
    //     pathMatch: 'full',
    //     loadChildren: () =>
    //         import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
