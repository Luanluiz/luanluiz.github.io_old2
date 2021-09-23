import { DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '@app/modules/dashboard/dashboard.module';
import { AuthGuard } from '@app/modules/login/auth.guard';
import { LoginModule } from '@app/modules/login/login.module';
import { MenuRoutingModule } from '@app/modules/menus/menu-routing.module';
import { MenuModule } from '@app/modules/menus/menu.module';
import { CountryService } from '@app/modules/cadastros/country.service';
// import { UsuarioRoutingModule } from '@app/modules/cadastros/usuario-routing.module';
import { UsuarioModule } from '@app/modules/cadastros/usuario.module';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        // HttpClientModule,
        MenuModule,
        // UsuarioModule,
        DashboardModule,
        HttpClientModule,
        ReactiveFormsModule,
        LoginModule,
        NgxSpinnerModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [CountryService, DecimalPipe, AuthGuard],
})
export class AppModule {
}
