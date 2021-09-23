import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sideNavItems, sideNavSections } from '@app/modules/menus/side-nav.data';
import { NavigationService } from '@app/services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-menu-esquerdo',
    templateUrl: 'menu-esquerdo.component.html',
})
export class MenuEsquerdoComponent implements OnInit, OnDestroy {

    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    sideNavItems = sideNavItems;
    sideNavSections = sideNavSections;
    sidenavStyle = 'sb-sidenav-dark';

    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        private roter: Router,
    ) {

        if (!localStorage.getItem('login')) {
            this.roter.navigateByUrl('login');
        }

    }

    ngOnInit() {
        if (this.light) {
            this.sidenavStyle = 'sb-sidenav-light';
        }
        this.subscription.add(this.navigationService.sideNavVisible$()
            .subscribe(isVisible => {
                this.sideNavHidden = !isVisible;
                this.changeDetectorRef.markForCheck();
            }),
        );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
