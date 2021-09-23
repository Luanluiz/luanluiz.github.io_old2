/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/modules/dashboard/dashboard.component';
import { DashboardModule } from '@app/modules/dashboard/dashboard.module';
import { SBRouteData } from '@app/modules/menus/navigation.model';

/* Routes */
// export const ROUTES: Routes = [
//     {
//         path: 'dashboard',
//         component: DashboardComponent,
//         // data: {
//         //     title: 'Dashboard - SB Admin Angular',
//         //     breadcrumbs: [
//         //         {
//         //             text: 'Dashboard',
//         //             active: true,
//         //         },
//         //     ],
//         // } as SBRouteData,
//         // canActivate: [],
//
//     },
// ];

@NgModule({
    // imports: [RouterModule.forChild(ROUTES)],
    // exports: [RouterModule],
})
export class DashboardRoutingModule {}
