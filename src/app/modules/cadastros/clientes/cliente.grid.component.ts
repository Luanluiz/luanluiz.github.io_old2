import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClienteModel } from '@app/modules/cadastros/clientes/cliente.model';
import { CountryService } from '@app/modules/cadastros/country.service';
import { GridComponent } from '@app/modules/cadastros/grid.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'cliente.grid.component.html',
})
export class ClienteGridComponent extends GridComponent<ClienteModel> {


    public clientes$: BehaviorSubject<Array<ClienteModel>>;

    constructor(private service: CountryService<ClienteModel>, changeDetectorRef: ChangeDetectorRef,
                private http: HttpClient, private spinner: NgxSpinnerService) {
        super(service, changeDetectorRef);

        this.clientes$ = new BehaviorSubject<Array<ClienteModel>>([]);
        this.carregarDados();
    }


    carregarDados() {
        this.spinner.show();
            this.service.buscarLista$('entidades/listCliente')
            .subscribe((dados) => {
                this.spinner.hide();
                this.clientes$.next(dados);
            });
    }

    excluir(cliente: ClienteModel) {
        this.service.delete$('entidades/deletar', cliente)
            .subscribe((cliente) => {
                setTimeout(() => this.carregarDados());
            });
    }
}
