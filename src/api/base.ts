export abstract class Base {

    protected db: any;

    protected table: string = '';

    protected common: Record<string, any>;

    protected abstract getTable(): string;

    constructor(db: any, common: Record<string, any>) {
        this.table = this.getTable();
        this.db = db(this.table);
        this.common = common;
    }

    log() {
        this.common.logger.log();
    }

    async read (id: number, fields: string[] = ['*']) {
        return this.db.read(id, fields);
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