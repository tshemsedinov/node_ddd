import { Base } from "./base";

export default class Country extends Base {

  protected getTable() {
    return 'country';
  }

  find(mask: string) {
    const sql = 'SELECT * from country where name like $1';
    return this.db.query(sql, [mask]);
  }
}




