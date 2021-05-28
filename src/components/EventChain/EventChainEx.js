import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';

import initialElements from './elements';

const nodeWidth = 172;
const nodeHeight = 56;
const RANFDIR = 'LR'

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (elements) => {
  dagreGraph.setGraph({ rankdir: RANFDIR });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);
  console.log(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = 'left'
      el.sourcePosition = 'right'
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const layoutedElements = getLayoutedElements(initialElements);

const LayoutFlow = () => {
  const [elements, setElements] = useState(layoutedElements);

  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);
      setElements(layoutedElements);
    },
    [elements]
  );

  return (
    <div className="event-chain">
      <ReactFlow
        elements={elements}
        // onConnect={onConnect}
        connectionLineType="smoothstep"
      />
    </div>
  );
};

export default LayoutFlow;
