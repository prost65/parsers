// https://lk.staropetrovskoe.ru/api/catalog/get_groups.json?token=cd95af1c-efb9-4928-a985-9f17bb10b776
// мск https://lk.staropetrovskoe.ru/api/catalog/get_elements.json?token=cd95af1c-efb9-4928-a985-9f17bb10b776&parent=%D0%A10003114&store=028
// крд https://lk.staropetrovskoe.ru/api/catalog/get_elements.json?t=54b55f6c3d693a07623efce7ea39cb7b&parent=%D0%A10003114&store=037

const fs = require("fs");

fetch('http://lk.staropetrovskoe.ru/api/catalog/get_groups.json?token=cd95af1c-efb9-4928-a985-9f17bb10b776')
  .then(res => res.json())
  .then(obj => {
      let ids = [];

      function getId(obj) {
        for (let prop in obj) {
          if (typeof (obj[prop]) === 'object') {
            getId(obj[prop]);
          } else {
            if (prop == 'id') {
              ids.push(obj.id);
            }
          }
        }
      }

      getId(obj);

      let requests = ids.map(id => fetch(`http://lk.staropetrovskoe.ru/api/catalog/get_elements.json?token=cd95af1c-efb9-4928-a985-9f17bb10b776&parent=${id}&store=028`));

      Promise.all(requests)
        .then(res => {
          return Promise.all(res.map(r => r.json()));
        })
        .then(
          res => {
            fs.writeFile('new.json', JSON.stringify(res), err => {
              if (err) {
                return console.log(err);
              }
            });
          }
        );
    }
  );




