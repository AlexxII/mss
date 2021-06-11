import React, { Fragment, useState } from 'react'

import SpeedAdd from '../../components/SpeedAdd'
import AddDialog from '../../components/AddDialog'
import EventChain from '../../components/EventChain'
import { v4 as uuidv4 } from 'uuid';
import eventsTypes from '../../constants/inarray'


const Tt = ({ data, title }) => {
  console.log(data);
  return (
    <div>
      <div style={{ fontWeight: '800' }}>
        <p>{title}</p>
        <span>{data?.comments ?? '-'}</span>
      </div>
    </div>
  )
}


const Main = () => {
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState(false)
  const [eTypes] = useState(eventsTypes.reduce((acum, item) => {
    acum[item.id] = item
    return acum
  }, {}))

  const handleEventAdd = (data) => {
    console.log(data.main)
    console.log(data.subEvents)
    const elements = []
    const adges = []
    setOpen(false)
    const position = { x: 50, y: 50 };
    const edgeType = 'straight';
    // события
    const main = data.main
    const firstNode = {
      id: uuidv4(),
      type: 'input',
      data: {
        label: main.title,
        comments: main.comments,
        date: main.date
      },
      style: { backgroundColor: 'red' },
      position: position
    }
    const subEvents = data.subEvents
    const subEventsPool = subEvents.map((event, index) => {
      // основные
      adges.push({
        id: `e${firstNode.id}`,
        source: firstNode.id,
        target: event.id,
        type: edgeType,
        animated: true
      })
      // конец отработки
      const endEvent = {
        id: uuidv4(),
        type: 'output',
        data: { label: 'ФИНИШ' },
        position
      }
      // ПТС - ШТ
      if (event.shtReport) {
        const shtId = uuidv4()
        // ШТ - конец
        adges.push({
          id: `sht${event.id}`,
          source: shtId,
          target: endEvent.id,
          type: edgeType,
          animated: true
        })
        elements.push({
          id: shtId,
          data: {
            label: 'ПТС'
          },
          position: position
        })
        // начало - ШТ
        adges.push({
          id: `tosht${event.id}`,
          source: event.id,
          target: shtId,
          type: edgeType,
          animated: true
        })
      }
      if (event.tlfReport) {
        const tlfId = uuidv4()
        // ПТС - конец
        adges.push({
          id: `tlf${firstNode.id}`,
          source: tlfId,
          target: endEvent.id,
          type: edgeType,
          animated: true
        })
        elements.push({
          id: tlfId,
          data: {
            label: 'ШТ'
          },
          position: position
        })
        // начало - ПТС
        adges.push({
          id: `totlf${event.id}`,
          source: event.id,
          target: tlfId,
          type: edgeType,
          animated: true
        })
      }
      if (!event.shtReport && !event.tlfReport) {
        adges.push({
          id: `mtoend${event.id}`,
          source: event.id,
          target: endEvent.id,
          type: edgeType,
          animated: true
        })
      }
      elements.push(endEvent)

      return {
        id: event.id,
        data: {
          eventId: event.type,
          label: <Tt data={event} title={eTypes[event.type].title} />,
          deadline: event.deadline,
          comments: event.comments,
        },
        position: position
      }
    })

    // цепочки
    const test = [
      firstNode,
      ...elements,
      ...subEventsPool,
      ...adges
    ]
    console.log(test);
    setEvents(test)
  }

  return (
    <Fragment>
      <div className="main-wrap">
        {events &&
          <EventChain events={events} />
        }
        <AddDialog
          open={open}
          close={() => setOpen(false)}
          save={handleEventAdd}
        />
        <SpeedAdd setAddOpen={() => setOpen(true)} />
      </div>
    </Fragment>
  )
}

export default Main