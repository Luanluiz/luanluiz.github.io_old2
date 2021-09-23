import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SideNavItems, SideNavSection } from '@app/modules/menus/navigation.model';
import { NavigationService } from '@app/services/navigation.service';
import { UserService } from '@modules/auth/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

    constructor(public navigationService: NavigationService, public userService: UserService) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
