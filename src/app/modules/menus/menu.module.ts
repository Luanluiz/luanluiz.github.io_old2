import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@app/modules/menus/footer/footer.component';
import { MenuEsquerdoComponent } from '@app/modules/menus/menu-esquerdo.component';
import { MenuRoutingModule } from '@app/modules/menus/menu-routing.module';
import { SideNavItemComponent } from '@app/modules/menus/side-nav-item/side-nav-item.component';
import { SideNavComponent } from '@app/modules/menus/side-nav/side-nav.component';
import { TopNavUserComponent } from '@app/modules/menus/top-nav-user/top-nav-user.component';
import { TopNavComponent } from '@app/modules/menus/top-nav/top-nav.component';
import { NavigationGuard } from '@app/services/navigation.guard';
import { NavigationService } from '@app/services/navigation.service';
import { SideNavService } from '@app/services/side-nav.service';
import { UserService } from '@app/services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { AppCommonModule } from '@common/app-common.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MenuRoutingModule,
        FontAwesomeModule,
    ],
    providers: [
        SideNavService,
        NavigationService,
        NavigationGuard,
        UserService,

    ],
    declarations: [
        MenuEsquerdoComponent,
        TopNavComponent,
        SideNavComponent,
        SideNavItemComponent,
        FooterComponent,
        TopNavUserComponent,
    ],
    exports: [
        MenuEsquerdoComponent,
        TopNavComponent,
        SideNavComponent,
        SideNavItemComponent,
        FooterComponent,
        TopNavUserComponent,
    ],

})
export class MenuModule {
}
