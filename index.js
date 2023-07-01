const fs = require("fs");

fetch('http://')
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

      let requests = ids.map(id => fetch(`http://${id}&`));

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




