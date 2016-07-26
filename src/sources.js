import { getInMemorySource } from './nodejs/sources/NodeInMemorySource';

export const InMemorySource = function() {
  return getInMemorySource();
};