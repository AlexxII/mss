import React, { useEffect, useState } from 'react'
import ReactFlow from 'react-flow-renderer';

const Tt = () => {
  const [tm, seTm] = useState(900)

  useEffect(() => {
    setTimeout(() => {
      seTm(tm - 1)
    }, 1000)
  })

  return (
    <div>
      <div style={{ fontWeight: '800' }}>
        Вводная №1
        <p>{tm}</p>
      </div>
    </div>
  )
}

const elements = [
  {
    id: '1',
    type: 'input',
    data: { label: <Tt /> },
    position: { x: 50, y: 100 },
    draggable: false,
    sourcePosition: 'right'
  },
  {
    id: '2',
    data: { label: <div>ОСС</div> },
    position: { x: 350, y: 45 },
    targetPosition: 'left',
    sourcePosition: 'right'
  },
  {
    id: '3',
    data: { label: <div>ПТС</div> },
    position: { x: 650, y: 45 },
    targetPosition: 'left',
    sourcePosition: 'right'
  },
  {
    id: '4',
    data: { label: <div>Письменный доклад</div> },
    position: { x: 950, y: 45 },
    targetPosition: 'left',
    sourcePosition: 'right'
  },
  {
    id: '5',
    data: { label: 'ЗАКОНЧИТЬ' },
    type: 'output',
    position: { x: 1300, y: 45 },
    targetPosition: 'left',
    sourcePosition: 'right'
  },
  {
    id: '6',
    data: { label: <div>ПТС</div> },
    position: { x: 350, y: 185 },
    targetPosition: 'left',
    sourcePosition: 'right'
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'ЗАКОНЧИТЬ' },
    position: { x: 650, y: 185 },
    targetPosition: 'left',

  },
  { id: 'e1-2', source: '1', target: '2', animated: false, label: 'ДОКЛАД' },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'ДОКЛАД' },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e1-6', source: '1', target: '6', animated: true, label: 'ДОКЛАД' },
  { id: 'e6-7', source: '6', target: '7' },
];

const EventChain = () => {
  return (
    <div className="event-chain">
      <ReactFlow
        elements={elements}
        zoomIn={false}
      />
    </div>
  )
}

export default EventChain