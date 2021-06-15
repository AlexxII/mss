import React, { Fragment, useState } from 'react'

import SpeedAdd from '../../components/SpeedAdd'
import AddDialog from '../../components/AddDialog'
import EventChain from '../../components/EventChain'
import { v4 as uuidv4 } from 'uuid';
import eventsTypes from '../../constants/inarray'

import BoxMain from '../../components/BoxMain'

const Main = () => {
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState(false)
  const [eTypes] = useState(eventsTypes.reduce((acum, item) => {
    acum[item.id] = item
    return acum
  }, {}))

  const handleEventAdd = (data) => {

    console.log(data);

    const elements = []
    const adges = []
    setOpen(false)
    const position = { x: 0, y: 0 };
    const edgeType = 'straight';
    // события
    const main = data.main
    const firstNode = {
      id: uuidv4(),
      type: 'input',
      data: {
        label: <BoxMain data={main} />,
        // label: main.title,
        comments: main.comments,
        date: main.date
      },
      draggable: false,
      position: position,
      className: "inputEvent"
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
        style: { backgroundColor: 'red', color: '#fff' },
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
          position: position,
          style: { backgroundColor: 'red', color: '#fff' }
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
          position: position,
          style: { backgroundColor: 'red', color: '#fff' }
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
          label: eTypes[event.type].title,
          deadline: event.deadline,
          comments: event.comments,
        },
        className: 'main-event',
        style: { backgroundColor: 'red', color: '#fff' },
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
    setEvents(prevState => {
      if (prevState.length) {
        return [
          ...prevState,
          ...test
        ]
      } else {
        return test
      }
    })
  }

  return (
    <Fragment>
      <div className="main-wrap">
        {events &&
          <EventChain events={events} newone={events.length}/>
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