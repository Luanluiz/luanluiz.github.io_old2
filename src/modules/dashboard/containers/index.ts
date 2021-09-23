import { DashboardComponent } from '@app/modules/dashboard/dashboard.component';
import { LightComponent } from './light/light.component';
import { StaticComponent } from './static/static.component';

export const containers = [DashboardComponent, StaticComponent, LightComponent];

export * from '@app/modules/dashboard/dashboard.component';
export * from './static/static.component';
export * from './light/light.component';
