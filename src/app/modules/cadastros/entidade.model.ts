import { AbstractModel } from '@app/modules/cadastros/abstract.model';

export abstract class EntidadeModel extends AbstractModel {

    public nome: string;
    public cpfCnpj: string;
    public rg: string;
    public cep: string;
    public endereco: string;
    public estado: string;
    public cidade: string;
    public email: string;
    public cliente: boolean;
    public fornecedor: boolean;
    public usuario: boolean;

    public dataNascimento: Date;

    constructor() {
        super();

        this.nome = '';
        this.cpfCnpj = '';
        this.rg = '';
        this.cep = '';
        this.endereco = '';
        this.estado = '';
        this.cidade = '';
        this.dataNascimento = new Date();
        this.email = '';
        this.cliente = false;
        this.fornecedor = false;
        this.usuario = false;
    }
}
