import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuEsquerdoComponent } from '@app/modules/menus/menu-esquerdo.component';

export const MenuRouter: Routes = [
    {
        path: 'menu',
        component: MenuEsquerdoComponent,
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(MenuRouter),
    ],
})
export class MenuRoutingModule {}
