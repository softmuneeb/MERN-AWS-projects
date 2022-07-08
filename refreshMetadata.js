// dependencies
import pkg from 'axios';
const { get } = pkg;

const url = `https://www.google.com/`;

const res = await get(url);

console.log(res.data);
