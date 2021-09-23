import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClienteModel } from '@app/modules/cadastros/clientes/cliente.model';
import { CountryService, LINK } from '@app/modules/cadastros/country.service';
import { BaixaFinanceiroModel } from '@app/modules/cadastros/financeiro/baixa-financeiro.model';
import { ContasReceberModel } from '@app/modules/cadastros/financeiro/contas-receber/contas-receber.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'baixa-financeiro.form.component.html',
})
export class BaixaFinanceiroFormComponent implements OnInit {

    public form$: BehaviorSubject<FormGroup>;
    public formDocumento$: BehaviorSubject<FormGroup>;
    public cliente$: Observable<Array<ClienteModel>>;

    public idFinanceiro: number;

    constructor(public service: CountryService<BaixaFinanceiroModel>, public router: ActivatedRoute,
                private formBuilder: FormBuilder, private local: Location, private http: HttpClient,
                private spinner: NgxSpinnerService) {

        this.formDocumento$ = new BehaviorSubject<FormGroup>(this.formBuilder.group(new ContasReceberModel()));
        this.form$ = new BehaviorSubject<FormGroup>(this.formBuilder.group(new BaixaFinanceiroModel()));

        this.cliente$ = this.http.get<ClienteModel[]>(`${LINK}entidades/listEntidades`)
            .pipe(map((dados) => dados));

        this.idFinanceiro = 0;
    }

    public ngOnInit() {
        this.router.params
            .pipe(
                filter((param) => param[`id`]),
                withLatestFrom(this.formDocumento$, (params: Params, form: FormGroup) => ({ params, form })),
                switchMap((obj: { params: Params, form: FormGroup }) => {
                    this.spinner.show();
                    this.idFinanceiro = +obj.params[`id`];
                    return this.service.getDado$('financeiro/financeiro/', +obj.params[`id`])
                        .pipe(map((dado) => ({ dado, form: obj.form })));
                }),
            )
            .subscribe((obj: { dado: any, form: FormGroup }) => {
                this.spinner.hide();
                obj.form.patchValue(obj.dado);
            });
    }

    baixar() {
        this.formDocumento$
            .pipe(
                switchMap((form: FormGroup) => {
                    this.spinner.show();
                    const financeiro: BaixaFinanceiroModel = form.getRawValue();
                    financeiro.idFinanceiro = this.idFinanceiro;
                    return this.service.gravar$('baixa/salvar', financeiro)
                        .pipe(map((financeiro) => financeiro));
                }))
            .subscribe((financeiro) => {
                this.spinner.hide();
                this.local.back();
            });

    }
}
