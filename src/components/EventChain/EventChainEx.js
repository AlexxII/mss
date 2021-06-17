import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';

import BoxMain from '../BoxMain'

const nodeTypes = {
  input: BoxMain,
  output: BoxMain
};

const nodeWidth = 200;
const nodeHeight = 76;
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
    console.log(el);
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
  const [elements, setElements] = useState([]);

  const onLayout = useCallback(
    (events) => {
      console.log(222);
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
        nodeTypes={nodeTypes}
        elements={elements}
        connectionLineType="smoothstep"
        zoomIn={false}
      />
    </div>
  );
};

export default LayoutFlow;

