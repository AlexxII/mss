import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';

import BoxIn from '../BoxIn'
import BoxOut from '../BoxOut'
import BoxMain from '../BoxMain'
import BoxEvent from '../BoxEvent'

const nodeTypes = {
  input: BoxIn,
  mainEvent: BoxMain,
  event: BoxEvent,
  output: BoxOut
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


const LayoutFlow = ({ events, newone, colorUpdate, newEdge }) => {
  const [elements, setElements] = useState([]);
  const onLayout = useCallback(
    (events) => {
      const layoutedElements = getLayoutedElements(events);
      setElements(layoutedElements);
    },
    [elements]
  );

  useEffect(() => {
    onLayout(events)
  }, [newone, colorUpdate])

  const style = {
    background: '#fff',
    width: '100%',
    height: '100%'
  }

  const handleEventClick = (_, node) => {
    console.log(node);
  }

  const onEdgeMouseEnter = (_, edge) => {
    console.log(edge);
  }

  const onConnect = ({ source, target }) => {
    newEdge(source, target)
  }

  return (
    <div className="event-chain">
      <ReactFlow
        style={style}
        nodeTypes={nodeTypes}
        elements={elements}
        // onElementClick={handleEventClick}
        connectionLineType="smoothstep"
        // onEdgeMouseEnter={onEdgeMouseEnter}
        onConnect={onConnect}
        zoomIn={false}
        // zoomOnScroll={false}
      />
    </div>
  );
};

export default LayoutFlow;

