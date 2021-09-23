export abstract class AbstractModel {
    [key: string]: string | number | Date | boolean;

    public id: number;

    protected constructor() {
        this.id = 0;
    }
}
