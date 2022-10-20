import { Base } from "./base";

export class Country extends Base {

  protected getTable() {
    return 'country';
  }

  read(id: number) {
    console.log('this.db');
    return super.read(id);
  }

  find(mask: string) {
    const sql = 'SELECT * from country where name like $1';
    return this.db.query(sql, [mask]);
  }
}




