import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { AbstractModel } from '@app/modules/cadastros/abstract.model';
import { SortDirection } from '@modules/tables/directives';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export const LINK = environment.apiUrl;

interface SearchResult {
    dados: Array<AbstractModel>;
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1: number | string | Date | boolean, v2: number | string | Date | boolean) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(dados: Array<AbstractModel>, column: string, direction: string): Array<AbstractModel> {
    if (direction === '') {
        return dados;
    } else {
        return [...dados].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(pojo: AbstractModel, term: string) {
    return (
        // pojo.nome.toLowerCase().includes(term.toLowerCase()) ||
        // pojo.cpfCnpj.toLowerCase().includes(term.toLowerCase()) ||
        // pojo.cidade.toLowerCase().includes(term.toLowerCase())
        true
    );
}

@Injectable({ providedIn: 'root' })
export class CountryService<T extends AbstractModel> {
    private _loading$ = new BehaviorSubject<boolean>(true);
    public _search$ = new Subject<void>();
    private _dados$ = new BehaviorSubject<Array<T>>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 6,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    constructor(private http: HttpClient) {
        // this._search$
        //     .pipe(
        //         tap(() => this._loading$.next(true)),
        //         debounceTime(120),
        //         switchMap(() => this._search(this.dados())),
        //         delay(120),
        //         tap(() => this._loading$.next(false)),
        //     )
        //     .subscribe(result => {
        //         this._dados$.next(result.dados);
        //         this._total$.next(result.total);
        //     });

        // this._search$.next();
    }

    public buscarLista$(endPoint: string) {
        return this.http.get<T[]>(`${LINK}${endPoint}`)
            .pipe(map((dados) => dados));
    }

    public getDado$(endPoint: string, id: number) {
        return this.http.get<T>(`${LINK}${endPoint}/${id}`)
            .pipe(map((dado) => dado));
    }

    public gravar$(endPoint: string, pojo: T) {
        return this.http.post<T>(`${LINK}${endPoint}`, pojo)
            .pipe(map((dado) => dado));
    }

    public delete$(endPoint: string, pojo: T) {
        return this.http.post<T>(`${LINK}${endPoint}`, pojo)
            .pipe(map((dado) => dado));
    }

    get dados$() {
        return this._dados$.asObservable();
    }

    get total$() {
        return this._total$.asObservable();
    }

    get loading$() {
        return this._loading$.asObservable();
    }

    get page() {
        return this._state.page;
    }

    set page(page: number) {
        this._set({ page });
    }

    get pageSize() {
        return this._state.pageSize;
    }

    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }

    get searchTerm() {
        return this._state.searchTerm;
    }

    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }

    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }

    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    public _search(listUsuarios: Array<T>): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let dados = sort(listUsuarios, sortColumn, sortDirection);

        // 2. filter
        dados = dados.filter(usuario => matches(usuario, searchTerm));
        const total = dados.length;

        // 3. paginate
        dados = dados.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ dados, total });
    }


    private dados(): Array<T> {
        //     const usuarios: Array<AbstractModel> = [];
        //     usuarios.push({
        //         id: 1,
        //         nome: 'Luan Luiz Gambeta',
        //         cpfCnpj: '077.813.829-19',
        //         cidade: 'Guabiruba',
        //         estado: 'SC',
        //         rg: '5.620.701',
        //         endereco: 'Rua Jacó rothermel',
        //         cep: '88360-000',
        //         email: 'luanluizg@gmail.com',
        //         dataNascimento: new Date(1991, 1, 1),
        //     });
        //     usuarios.push({
        //         id: 2,
        //         nome: 'Luiz',
        //         cpfCnpj: '077.813.829-19',
        //         cidade: 'Guabiruba',
        //         estado: 'SC',
        //         rg: '5.620.701',
        //         endereco: 'Rua Jacó rothermel',
        //         cep: '88360-000',
        //         email: 'luanluizg@gmail.com',
        //         dataNascimento: new Date(1991, 1, 1),
        //     });
        //     usuarios.push({
        //         id: 3,
        //         nome: 'Juliano',
        //         cpfCnpj: '077.813.829-19',
        //         cidade: 'Guabiruba',
        //         estado: 'SC',
        //         rg: '5.620.701',
        //         endereco: 'Rua Jacó rothermel',
        //         cep: '88360-000',
        //         email: 'luanluizg@gmail.com',
        //         dataNascimento: new Date(1991, 1, 1),
        //     });
        //     usuarios.push({
        //         id: 4,
        //         nome: 'Nathan',
        //         cpfCnpj: '077.813.829-19',
        //         cidade: 'Guabiruba',
        //         estado: 'SC',
        //         rg: '5.620.701',
        //         endereco: 'Rua Jacó rothermel',
        //         cep: '88360-000',
        //         email: 'luanluizg@gmail.com',
        //         dataNascimento: new Date(1991, 1, 1),
        //     });
        return [];
    }
}
