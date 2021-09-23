import { CountryService } from '@app/modules/cadastros/country.service';
import { TablesService } from '@app/modules/cadastros/tables.service';

export const services = [TablesService, CountryService];

export * from '@app/modules/cadastros/tables.service';
export * from '@app/modules/cadastros/country.service';
