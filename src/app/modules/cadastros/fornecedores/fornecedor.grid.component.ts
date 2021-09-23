import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ClienteModel } from '@app/modules/cadastros/clientes/cliente.model';
import { CountryService } from '@app/modules/cadastros/country.service';
import { FornecedorModel } from '@app/modules/cadastros/fornecedores/fornecedor.model';
import { GridComponent } from '@app/modules/cadastros/grid.component';
import { UsuarioModel } from '@app/modules/cadastros/usuarios/usuario.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'fornecedor.grid.component.html',
})
export class FornecedorGridComponent extends GridComponent<FornecedorModel> {

    fornecedor$: BehaviorSubject<Array<FornecedorModel>>;

    constructor(private service: CountryService<FornecedorModel>, changeDetectorRef: ChangeDetectorRef,
                private spinner: NgxSpinnerService) {
        super(service, changeDetectorRef);

        this.fornecedor$ = new BehaviorSubject<Array<FornecedorModel>>([]);
        this.carregarDados();
    }

    carregarDados() {
        this.spinner.show();
        this.service.buscarLista$('entidades/listFornecedor')
            .subscribe((dados) => {
                this.spinner.hide();
                this.fornecedor$.next(dados);
            });
    }

    excluir(cliente: FornecedorModel) {
        this.service.delete$('entidades/deletar', cliente)
            .subscribe((cliente) => {
                setTimeout(() => this.carregarDados());
            });
    }

}
