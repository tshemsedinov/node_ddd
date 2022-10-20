import vm from 'node:vm';

(async () => {
    const apiName = 'user';
    const className = apiName[0].toUpperCase() + apiName.slice(1);
    const result = vm.runInContext(`new Api(db, common);`, vm.createContext(Object.freeze({
        db: (await import('./lib/db'))['db'],
        common: {
            hash: await require('./lib/hash'),
        },
        Api: (await import(`./api/${apiName}`))[`${className}`]
    })), { timeout: 5000, displayErrors: true });

    console.log(result);
    console.log(await result['read'](5));
    //console.log(await result['create']({ login: 'zaza', password: 'tuta' }));
})();


