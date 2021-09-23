import { AbstractModel } from '@app/modules/cadastros/abstract.model';

export class FinanceiroModel extends AbstractModel {

    public idEntidade: number;
    public nomeEntidade: string;
    public tipoDocumento: string;
    public emissao: Date;
    public vencimento: Date;
    public valor: number;
    public tipo: string;
    public status: string;

    constructor() {
        super();

        this.nomeEntidade = '';
        this.idEntidade = 0;
        this.tipoDocumento = '';
        this.emissao = new Date();
        this.vencimento = new Date();
        this.valor = 0;
        this.tipo = '';
        this.status = 'Aberto';
    }

}
