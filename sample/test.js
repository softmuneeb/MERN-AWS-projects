const translate = require('translate-google');
const tranObj = {
  a: 1,
  b: '1',
  c: 'hello',
  d: [true, 'true', 'hi', { a: 'hello', b: ['world'] }],
};

translate(tranObj, { to: 'English', except: ['a'] })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
