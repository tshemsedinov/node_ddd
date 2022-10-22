import { Base } from './base'

export default class User extends Base {

  protected getTable() {
    return 'users';
  }

  async read(id: number) {
    return super.read(id, ['id', 'login']);
  }

  async create(params: Record<string, string>) {
    const { login, password } = params;
    const passwordHash = await this.common.hash(password);
    return this.db.create({ login, password: passwordHash });
  }

  async update(id: number, params: Record<string, string>) {
    const { login, password } = params;
    const passwordHash = await this.common.hash(password);
    return this.db.update(id, { login, password: passwordHash });
  }

  find(mask: string) {
    const sql = `SELECT login from users where login like $1`;
    return this.db.query(sql, [mask]);
  }

}

