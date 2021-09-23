import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { CountryService } from '@app/modules/cadastros/country.service';

describe('CountryService', () => {
    let countryService: CountryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CountryService, DecimalPipe],
        });
        countryService = TestBed.inject(CountryService);
    });

    describe('countries$', () => {
        it('should return Observable<Country[]>', () => {
            countryService.countries$.subscribe(response => {
                expect(response).toBeDefined();
            });
        });
    });
});
