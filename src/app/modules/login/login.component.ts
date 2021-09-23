import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LINK } from '@app/modules/cadastros/country.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    public form$: BehaviorSubject<FormGroup>;
    public msg$: BehaviorSubject<string>;

    constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient,
                private spinner: NgxSpinnerService) {
        this.form$ = new BehaviorSubject<FormGroup>(formBuilder.group({ usuario: '', senha: '' }));
        this.msg$ = new BehaviorSubject<string>('');
    }

    ngOnInit() {

    }

    public logar() {
        this.spinner.show();
        this.form$
            .pipe(
                switchMap((form) => {
                    const usuario = form.get('usuario')?.value;
                    const senha = form.get('senha')?.value;

                    const params = new HttpParams()
                        .set('usuario', usuario)
                        .set('senha', senha);

                    return this.http.get<boolean>(`${LINK}usuario/login`, { params })
                        .pipe(
                            map((ok: boolean) => ({ ok, form })),
                        );
                }),
            )
            .subscribe((obj: { ok: boolean, form: FormGroup }) => {
                this.spinner.hide();
                this.msg$.next('');

                if (obj && obj.ok) {
                    localStorage.setItem('login', JSON.stringify(obj.form.getRawValue()));
                    this.router.navigateByUrl('dashboard/dashboard');
                } else {
                    this.msg$.next('Usuário ou senha invalidos');
                    localStorage.removeItem('login');
                }
            });
    }
}

