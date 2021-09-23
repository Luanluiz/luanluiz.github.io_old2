import { SideNavItems, SideNavSection } from '@app/modules/menus/navigation.model';

export const sideNavSections: SideNavSection[] = [
    {
        text: '',
        items: ['dashboard'],
    },
    {
        text: 'Menu',
        items: ['cadastros', 'financeiros'],
    },
    // {
    //     text: 'ADDONS',
    //     items: ['charts', 'tables'],
    // },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard/dashboard',
    },
    cadastros: {
        icon: 'columns',
        text: 'Cadastro',
        submenu: [

            {
                text: 'Clientes',
                link: '/cadastros/cliente',
            },
            {
                text: 'Fornecedores',
                link: '/cadastros/fornecedor',
            },

            {
                text: 'Usuários',
                link: '/cadastros/usuario',
            },
        ],
    },
    financeiros: {
        icon: 'book-open',
        text: 'Financeiro',
        submenu: [
            {
                text: 'Contas a receber',
                link: '/cadastros/contas-receber',
            },
            {
                text: 'Contas a pagar',
                link: '/cadastros/contas-pagar',
            },
        ],
    },
    // charts: {
    //     icon: 'chart-area',
    //     text: 'Charts',
    //     link: '/charts',
    // },
    // tables: {
    //     icon: 'table',
    //     text: 'Tables',
    //     link: '/tables',
    // },
};
