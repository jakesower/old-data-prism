import { Stream, just } from 'most';
import { VNode } from 'snabbdom/vnode';

interface StreamMap {
  [propName: string]: Stream<any>
}

interface ActionMap {
  [propName: string]: (event: Event) => Stream<any>
}

interface Initializer {
  (props: {}): {}
}

interface View {
  (state: {}, actions: ActionMap): VNode
}

interface Component<A> {
  (init: Initializer): Stream<VNode>
}

const makeComponent = ((init: Initializer, view: View, actionStreams: StreamMap): Stream<VNode> => {
  return just(view(init, {}));
});

export { Component, makeComponent, View };
