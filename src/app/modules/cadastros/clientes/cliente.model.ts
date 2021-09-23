import { AbstractModel } from '@app/modules/cadastros/abstract.model';
import { EntidadeModel } from '@app/modules/cadastros/entidade.model';

export class ClienteModel extends EntidadeModel {

    constructor() {
        super();

        this.cliente = true;
    }
}
