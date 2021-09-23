import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbsComponent } from '@app/modules/dashboard/breadcrumbs/breadcrumbs.component';
import { CardViewDetailsComponent } from '@app/modules/dashboard/card-view-details/card-view-details.component';
import { CardComponent } from '@app/modules/dashboard/card/card.component';
import { ChartsAreaComponent } from '@app/modules/dashboard/charts/charts-area/charts-area.component';
import { ChartsBarComponent } from '@app/modules/dashboard/charts/charts-bar/charts-bar.component';
import { ChartsPieComponent } from '@app/modules/dashboard/charts/charts-pie/charts-pie.component';
import { ChartsComponent } from '@app/modules/dashboard/charts/charts.component';
import { ChartsService } from '@app/modules/dashboard/charts/serives/charts.service';
import { DashboardCardsComponent } from '@app/modules/dashboard/dashboard-card/dashboard-cards.component';
import { DashboardChartsComponent } from '@app/modules/dashboard/dashboard-charts/dashboard-charts.component';
import { DashboardHeadComponent } from '@app/modules/dashboard/dashboard-head/dashboard-head.component';
import { DashboardRoutingModule } from '@app/modules/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/modules/dashboard/dashboard.component';
import { DashboardGuard } from '@app/modules/dashboard/services/dashboard.guard';
import { DashboardService } from '@app/modules/dashboard/services/dashboard.service';
import { AppCommonModule } from '@common/app-common.module';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from '@modules/icons/icons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const ROUTES: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
];


@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        // RouterModule,
        // ReactiveFormsModule,
        FormsModule,
        // AppCommonModule,
        FontAwesomeModule,
        // DashboardRoutingModule,
        IconsModule,
        NgbModule,
        // NavigationModule,
        // ChartsModule,
        // TablesModule,
        // MenuModule,
    ],
    providers: [DashboardService, DashboardGuard, ChartsService],
    declarations: [
        DashboardComponent,
        DashboardCardsComponent,
        DashboardChartsComponent,
        DashboardHeadComponent,
        BreadcrumbsComponent,
        ChartsComponent,
        ChartsPieComponent,
        ChartsBarComponent,
        ChartsAreaComponent,
        CardComponent,
        CardViewDetailsComponent,
    ],
    // exports: [
    //     DashboardComponent,
    //     DashboardCardsComponent,
    //     DashboardChartsComponent,
    //     DashboardHeadComponent,
    //     BreadcrumbsComponent,
    //     ChartsComponent,
    //     ChartsPieComponent,
    //     ChartsBarComponent,
    //     ChartsAreaComponent,
    //     CardComponent,
    //     CardViewDetailsComponent,
    // ],
})
export class DashboardModule {
}
