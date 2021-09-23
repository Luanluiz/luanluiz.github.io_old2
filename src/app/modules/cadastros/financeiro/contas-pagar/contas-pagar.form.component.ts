import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CountryService, LINK } from '@app/modules/cadastros/country.service';
import { ContasPagarModel } from '@app/modules/cadastros/financeiro/contas-pagar/contas-pagar.model';
import { FornecedorModel } from '@app/modules/cadastros/fornecedores/fornecedor.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'contas-pagar.form.component.html',
})
export class ContasPagarFormComponent implements OnInit {

    public form$: BehaviorSubject<FormGroup>;
    public fornecedores$: Observable<Array<FornecedorModel>>;

    constructor(public service: CountryService<ContasPagarModel>, public router: ActivatedRoute,
                private formBuilder: FormBuilder, private local: Location, private http: HttpClient,
                private spinner: NgxSpinnerService) {

        this.form$ = new BehaviorSubject<FormGroup>(this.formBuilder.group(new ContasPagarModel()));
        this.fornecedores$ = this.http.get<FornecedorModel[]>(`${LINK}entidades/listFornecedor`)
            .pipe(map((dados) => dados));
    }

    ngOnInit() {

        this.router.params
            .pipe(
                filter((param) => param[`id`]),
                withLatestFrom(this.form$, (params: Params, form: FormGroup) => ({ params, form })),
                switchMap((obj: { params: Params, form: FormGroup }) => {
                    this.spinner.show();
                    return this.service.getDado$('financeiro/financeiro/', +obj.params[`id`])
                        .pipe(map((dado) => ({ dado, form: obj.form })));
                }),
            )
            .subscribe((obj: { dado: ContasPagarModel, form: FormGroup }) => {
                this.spinner.hide();
                obj.form.patchValue(obj.dado);
                if (obj.dado.status === 'Quitado') {
                    obj.form.get('nomeEntidade')?.disable();
                    obj.form.get('tipoDocumento')?.disable();
                    obj.form.get('emissao')?.disable();
                    obj.form.get('vencimento')?.disable();
                    obj.form.get('valor')?.disable();
                }
            });
    }

    gravar() {
        this.form$
            .pipe(
                switchMap((form: FormGroup) => {
                    this.spinner.show();
                    const financeiro: ContasPagarModel = form.getRawValue();
                    return this.service.gravar$('financeiro/salvar', financeiro)
                        .pipe(map((financeiro) => financeiro));
                }))
            .subscribe((financeiro) => {
                this.spinner.hide();
                this.local.back();
            });

    }

}
