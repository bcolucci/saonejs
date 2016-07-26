
import NodeTransform from './nodejs/NodeTransform'

export const pipe = (stream, fn?: Function) => {
  const transform = new NodeTransform({ fn })
  return stream.pipe(transform)
}
