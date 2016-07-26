
import { pipe } from '../streams';

const log = function(data) {
  console.log(data);
  return data;
};

export const ConsoleLog = function(params) {
  return (stream) => pipe(stream, (data) => log(data));
};
