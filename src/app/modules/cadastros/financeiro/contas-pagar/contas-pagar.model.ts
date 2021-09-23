import { FinanceiroModel } from '@app/modules/cadastros/financeiro/financeiro.model';

export class ContasPagarModel extends FinanceiroModel {

    constructor() {
        super();

        this.tipo = 'P';
    }
}
