import { AbstractModel } from '@app/modules/cadastros/abstract.model';
import { EntidadeModel } from '@app/modules/cadastros/entidade.model';

export class FornecedorModel extends EntidadeModel {

    constructor() {
        super();

        this.fornecedor = true;
    }
}
