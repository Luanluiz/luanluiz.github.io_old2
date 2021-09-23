import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from '@app/modules/cadastros/clientes/cliente.form.component';
import { ClienteGridComponent } from '@app/modules/cadastros/clientes/cliente.grid.component';
import { CountryService } from '@app/modules/cadastros/country.service';
import { BaixaFinanceiroFormComponent } from '@app/modules/cadastros/financeiro/baixa-financeiro.form.component';
import { ContasPagarFormComponent } from '@app/modules/cadastros/financeiro/contas-pagar/contas-pagar.form.component';
import { ContasPagarGridComponent } from '@app/modules/cadastros/financeiro/contas-pagar/contas-pagar.grid.component';
import { ContasReceberFormComponent } from '@app/modules/cadastros/financeiro/contas-receber/contas-receber.form.component';
import { ContasReceberGridComponent } from '@app/modules/cadastros/financeiro/contas-receber/contas-receber.grid.component';
import { FornecedorFormComponent } from '@app/modules/cadastros/fornecedores/fornecedor.form.component';
import { FornecedorGridComponent } from '@app/modules/cadastros/fornecedores/fornecedor.grid.component';
import { SBSortableHeaderDirective } from '@app/modules/cadastros/sortable.directive';
import { UsuarioComponent } from '@app/modules/cadastros/usuarios/usuario.component';
import { UsuarioGridComponent } from '@app/modules/cadastros/usuarios/usuario.grid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

export const ROUTES_USUARIOS: Routes = [
    // usuarios
    {
        path: 'usuario',
        component: UsuarioGridComponent,
    },
    {
        path: 'usuario/save',
        component: UsuarioComponent,
    },
    {
        path: 'usuario/save/:id',
        component: UsuarioComponent,
    },

    // cliente

    {
        path: 'cliente',
        component: ClienteGridComponent,
    },
    {
        path: 'cliente/save',
        component: ClienteFormComponent,
    },
    {
        path: 'cliente/save/:id',
        component: ClienteFormComponent,
    },

    // Fornecedor

    {
        path: 'fornecedor',
        component: FornecedorGridComponent,
    },
    {
        path: 'fornecedor/save',
        component: FornecedorFormComponent,
    },
    {
        path: 'fornecedor/save/:id',
        component: FornecedorFormComponent,
    },

    // financeiro
    {
        path: 'contas-receber',
        component: ContasReceberGridComponent,
    },
    {
        path: 'contas-receber/save',
        component: ContasReceberFormComponent,
    },
    {
        path: 'contas-receber/save/:id',
        component: ContasReceberFormComponent,
    },

    {
        path: 'contas-receber/baixa/:id',
        component: BaixaFinanceiroFormComponent,
    },

    {
        path: 'contas-pagar',
        component: ContasPagarGridComponent,
    },
    {
        path: 'contas-pagar/save',
        component: ContasPagarFormComponent,
    },
    {
        path: 'contas-pagar/save/:id',
        component: ContasPagarFormComponent,
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES_USUARIOS),
        CommonModule,
        // UsuarioRoutingModule,
        // DashboardModule,
        FontAwesomeModule,
        // RouterModule,
        ReactiveFormsModule,
        FormsModule,
        // AppCommonModule,
        NgbTypeaheadModule,
        NgbPaginationModule,
        // MenuModule,
        // DashboardModule,
        // NavigationModule,
        // ChartsModule,
        // TablesModule,
        // MenuModule,
    ],


    providers: [CountryService],

    declarations: [
        UsuarioGridComponent,
        UsuarioComponent,
        ClienteGridComponent,
        ClienteFormComponent,
        FornecedorGridComponent,
        FornecedorFormComponent,

        ContasReceberGridComponent,
        ContasReceberFormComponent,
        ContasPagarGridComponent,
        ContasPagarFormComponent,
        BaixaFinanceiroFormComponent,
        SBSortableHeaderDirective,
    ],

    exports: [
        // UsuarioGridComponent,
    ],
})
export class UsuarioModule {
}
