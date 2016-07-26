import NodeTransform from './nodejs/NodeTransform';

export const pipe = function(stream, fn) {
  let transform = new NodeTransform({ fn });
  return stream.pipe(transform);
};