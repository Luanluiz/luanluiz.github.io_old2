import { AbstractModel } from '@app/modules/cadastros/abstract.model';

export class BaixaFinanceiroModel extends AbstractModel {

    public formaPagamento: string;
    public valor: number;
    public idFinanceiro: number;

    constructor() {
        super();

        this.formaPagamento = '';
        this.valor = 0;
        this.idFinanceiro = 0;
    }
}
