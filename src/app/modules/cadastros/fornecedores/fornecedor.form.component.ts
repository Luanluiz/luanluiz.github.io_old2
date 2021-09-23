import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClienteModel } from '@app/modules/cadastros/clientes/cliente.model';
import { CountryService } from '@app/modules/cadastros/country.service';
import { FornecedorModel } from '@app/modules/cadastros/fornecedores/fornecedor.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'fornecedor.form.component.html',
})
export class FornecedorFormComponent implements OnInit {

    public form$: BehaviorSubject<FormGroup>;

    constructor(public service: CountryService<FornecedorModel>, public router: ActivatedRoute,
                private formBuilder: FormBuilder, private local: Location,
                private spinner: NgxSpinnerService) {

        this.form$ = new BehaviorSubject<FormGroup>(this.formBuilder.group(new FornecedorModel()));

    }

    ngOnInit() {

        this.router.params
            .pipe(
                filter((param) => param[`id`]),
                withLatestFrom(this.form$, (params: Params, form: FormGroup) => ({ params, form })),
                switchMap((obj: { params: Params, form: FormGroup }) => {
                    this.spinner.show();
                    return this.service.getDado$('entidades/entidade/', +obj.params[`id`])
                        .pipe(map((dado) => ({ dado, form: obj.form })));
                }),
            )
            .subscribe((obj: { dado: ClienteModel, form: FormGroup }) => {
                this.spinner.hide();
                obj.form.patchValue(obj.dado);
            });

    }

    gravar() {
        this.form$
            .pipe(
                switchMap((form: FormGroup) => {
                    this.spinner.show();
                    const fornecedor: FornecedorModel = form.getRawValue();
                    return this.service.gravar$('entidades/salvar', fornecedor)
                        .pipe(map((fornecedor) => fornecedor));
                }))
            .subscribe((fornecedor) => {
                this.spinner.hide();
                this.local.back();
            });

    }
}
