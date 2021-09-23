import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClienteModel } from '@app/modules/cadastros/clientes/cliente.model';
import { CountryService, LINK } from '@app/modules/cadastros/country.service';
import { UsuarioModel } from '@app/modules/cadastros/usuarios/usuario.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'usuario.component.html',
})
export class UsuarioComponent implements OnInit {


    usuario: UsuarioModel;
    public form$: BehaviorSubject<FormGroup>;
    public cliente$: Observable<Array<ClienteModel>>;

    constructor(public service: CountryService<UsuarioModel>, public router: ActivatedRoute,
                private http: HttpClient, private formBuilder: FormBuilder, private local: Location,
                private spinner: NgxSpinnerService) {
        this.usuario = new UsuarioModel();

        this.form$ = new BehaviorSubject<FormGroup>(this.formBuilder.group(new UsuarioModel()));
        this.cliente$ = this.http.get<ClienteModel[]>(`${LINK}entidades/listCliente`)
            .pipe(map((dados) => dados));
    }

    ngOnInit() {

        this.router.params
            .pipe(
                filter((param) => param[`id`]),
                withLatestFrom(this.form$, (params: Params, form: FormGroup) => ({ params, form })),
                switchMap((obj: { params: Params, form: FormGroup }) => {
                    this.spinner.show();
                    return this.service.getDado$('usuario/usuario/', +obj.params[`id`])
                        .pipe(map((dado) => ({ dado, form: obj.form })));
                }),
            )
            .subscribe((obj: { dado: UsuarioModel, form: FormGroup }) => {
                this.spinner.hide();
                obj.form.patchValue(obj.dado);
            });
    }

    gravar() {
        this.form$
            .pipe(
                switchMap((form: FormGroup) => {
                    this.spinner.show();
                    const usuario: UsuarioModel = form.getRawValue();
                    return this.service.gravar$('usuario/salvar', usuario)
                        .pipe(map((user) => user));
                }))
            .subscribe((user) => {
                this.spinner.hide();
                this.local.back();
            });

    }
}
