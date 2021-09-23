import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@app/services/navigation.service';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(private navigationService: NavigationService, private router: Router) {
    }

    ngOnInit() {
    }

    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }

    public sair() {
        localStorage.removeItem('login');
        this.router.navigate(['login']);
    }
}
