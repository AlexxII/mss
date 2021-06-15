import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';

import initialElements from './elementsEx';

const nodeWidth = 200;
const nodeHeight = 76;
const RANFDIR = 'LR'

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (elements) => {
  console.log(elements);
  dagreGraph.setGraph({ rankdir: RANFDIR });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

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


const LayoutFlow = ({ events, newone }) => {
  const layoutedElements = getLayoutedElements(events);
  const [elements, setElements] = useState(layoutedElements);

  const onLayout = useCallback(
    (events) => {
      console.log('2222222222');
      const layoutedElements = getLayoutedElements(events);
      setElements(layoutedElements);
    },
    [elements]
  );

  useEffect(() => {
    onLayout(events)
  }, [newone])

  const style = {
    background: '#fff',
    width: '100%',
    height: '100%'
  }

  const handleEventClick = (_, node) => {
    console.log(node);
  }

  return (
    <div className="event-chain">
      <ReactFlow
        style={style}
        elements={elements}
        connectionLineType="smoothstep"
        zoomIn={false}
      />
    </div>
  );
};

export default LayoutFlow;

