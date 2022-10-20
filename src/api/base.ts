export abstract class Base {

    protected db: any;

    protected common: Record<string, any>;

    protected abstract getTable(): string;

    constructor(db: any, common: Record<string, any>) {
        this.db = db(this.getTable());
        this.common = common;
    }

    async read (id: number) {
        return this.db.read(id);
    }

    async create({ ...record }) {
        return this.db.create(record);
    }

    async update(id: number, { ...record }) {
        return this.db.update(id, record);
    }

    async delete(id: number) {
        return this.db.delete(id);
    }
}