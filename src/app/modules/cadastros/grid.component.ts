import { ChangeDetectorRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractModel } from '@app/modules/cadastros/abstract.model';
import { CountryService } from '@app/modules/cadastros/country.service';
import { SBSortableHeaderDirective, SortEvent } from '@app/modules/cadastros/sortable.directive';
import { Observable } from 'rxjs';

export abstract class GridComponent<POJO extends AbstractModel> implements OnInit {

    @Input() pageSize = 6;

    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    protected constructor(
        public countryService: CountryService<POJO>,
        public changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.countryService.pageSize = this.pageSize;
        this.total$ = this.countryService.total$;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.countryService.sortColumn = column;
        this.countryService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }

    onDelete(user: POJO) {
        console.info(user);
    }
}
