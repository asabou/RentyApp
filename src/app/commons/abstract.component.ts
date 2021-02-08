export abstract class  AbstractComponent {

    constructor() {
    }

    abstract getEntityId(): number;

    abstract getAllData(): void;

    abstract afterDelete(id: string): void;

    abstract getTableId(): string;
}