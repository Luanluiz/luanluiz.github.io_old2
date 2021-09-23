import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClienteModel } from '@app/modules/cadastros/clientes/cliente.model';
import { CountryService } from '@app/modules/cadastros/country.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'cliente.form.component.html',
})
export class ClienteFormComponent implements OnInit {

    public form$: BehaviorSubject<FormGroup>;

    constructor(public service: CountryService<ClienteModel>, public router: ActivatedRoute,
                private formBuilder: FormBuilder, private local: Location,
                private spinner: NgxSpinnerService) {

        this.form$ = new BehaviorSubject<FormGroup>(this.formBuilder.group(new ClienteModel()));

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
                obj.form.patchValue(obj.dado);
                this.spinner.hide();
            });
    }

    gravar() {
        this.form$
            .pipe(
                switchMap((form: FormGroup) => {
                    this.spinner.show();
                    const cliente: ClienteModel = form.getRawValue();
                    return this.service.gravar$('entidades/salvar', cliente)
                        .pipe(map((cliente) => cliente));
                }))
            .subscribe((cliente) => {
                this.spinner.hide();
                this.local.back();
            });

    }
}
