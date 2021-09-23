import { AbstractModel } from '@app/modules/cadastros/abstract.model';

export class UsuarioModel extends AbstractModel {

    public nome: string;
    public idEntidade: number;
    public entidade: string;
    public usuario: string;
    public senha: string;
    public email: string;

    constructor() {
        super();

        this.nome = '';
        this.idEntidade = 0;
        this.entidade = '';
        this.usuario = '';
        this.senha = '';
        this.email = '';
    }
}
