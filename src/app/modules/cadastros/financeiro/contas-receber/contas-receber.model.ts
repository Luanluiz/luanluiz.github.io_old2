import { FinanceiroModel } from '@app/modules/cadastros/financeiro/financeiro.model';

export class ContasReceberModel extends FinanceiroModel {

    constructor() {
        super();

        this.tipo = 'R';
    }
}
