import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/modules/login/auth.guard';
import { LoginComponent } from '@app/modules/login/login.component';

export const ROUTES_LOGIN: Routes = [
    // login
    {
        path: 'login',
        component: LoginComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES_LOGIN),
        ReactiveFormsModule,
        CommonModule,
    ],


    // providers: [CountryService],

    declarations: [
        LoginComponent,
    ],

    exports: [
        // UsuarioGridComponent,
    ],
})
export class LoginModule {
}
