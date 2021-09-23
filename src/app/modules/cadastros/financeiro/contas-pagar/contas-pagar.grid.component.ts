import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '@app/modules/cadastros/country.service';
import { ContasPagarModel } from '@app/modules/cadastros/financeiro/contas-pagar/contas-pagar.model';
import { GridComponent } from '@app/modules/cadastros/grid.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'contas-pagar.grid.component.html',
})
export class ContasPagarGridComponent extends GridComponent<ContasPagarModel> {


    public financeiro$: BehaviorSubject<Array<ContasPagarModel>>;

    constructor(private service: CountryService<ContasPagarModel>, changeDetectorRef: ChangeDetectorRef,
                private router: Router, private spinner: NgxSpinnerService) {
        super(service, changeDetectorRef);

        this.financeiro$ = new BehaviorSubject<Array<ContasPagarModel>>([]);
        this.carregarDados();
    }

    carregarDados() {
        this.spinner.show();
        this.service.buscarLista$('financeiro/listpagar')
            .subscribe((dados) => {
                this.spinner.hide();
                this.financeiro$.next(dados);
            });
    }

    excluir(financeiro: ContasPagarModel) {
        this.service.delete$('financeiro/deletar', financeiro)
            .subscribe((financeiro) => {
                setTimeout(() => this.carregarDados());
            });
    }

    baixar(id: number) {
        this.router.navigateByUrl(`/cadastros/contas-receber/baixa/${id}`);
    }
}
