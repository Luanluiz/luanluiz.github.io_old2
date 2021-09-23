import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '@app/modules/cadastros/country.service';
import { FinanceiroModel } from '@app/modules/cadastros/financeiro/financeiro.model';
import { GridComponent } from '@app/modules/cadastros/grid.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'contas-receber.grid.component.html',
})
export class ContasReceberGridComponent extends GridComponent<FinanceiroModel> {

    public financeiro$: BehaviorSubject<Array<FinanceiroModel>>;

    constructor(private service: CountryService<FinanceiroModel>, changeDetectorRef: ChangeDetectorRef,
                private router: Router, private spinner: NgxSpinnerService) {
        super(service, changeDetectorRef);

        this.financeiro$ = new BehaviorSubject<Array<FinanceiroModel>>([]);
        this.carregarDados();
    }

    carregarDados() {
        this.spinner.show();
        this.service.buscarLista$('financeiro/listreceber')
            .subscribe((dados) => {
                this.spinner.hide();
                this.financeiro$.next(dados);
            });
    }

    excluir(financeiro: FinanceiroModel) {
        this.service.delete$('financeiro/deletar', financeiro)
            .subscribe((financeiro) => {
                setTimeout(() => this.carregarDados());
            });
    }

    baixar(id: number) {
        this.router.navigateByUrl(`/cadastros/contas-receber/baixa/${id}`);
    }
}
