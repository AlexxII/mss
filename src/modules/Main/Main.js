import React, { Fragment, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import { isNode, getOutgoers } from 'react-flow-renderer';

import SpeedAdd from '../../components/SpeedAdd'
import EventChain from '../../components/EventChain'
import AddDialog from '../../components/AddDialog'
import Info from '../../components/Info'
import ConfirmDialog from '../../components/ConfirmDialog'
import eventsTypes from '../../constants/inarray'

const Main = () => {
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState(false)
  const [eUpdate, setEUpdate] = useState(false)
  const [eTypes] = useState(eventsTypes.reduce((acum, item) => {
    acum[item.id] = item
    return acum
  }, {}))

  useEffect(() => {
    const rawData = localStorage.getItem('chain')
    if (rawData) {
      const chains = JSON.parse(rawData)
      const chainX = chains.map(item => {
        if (isNode(item)) {
          return {
            ...item,
            data: {
              ...item.data,
              handleDone: handleDone,
              handleDel: handleDel
            }
          }
        }
        return item
      })
      setEvents(chainX)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chain', JSON.stringify(events))
  }, [events])

  const handleEventAdd = (data) => {
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
        label: main.title,
        comments: main.comments,
        date: main.startDate
      },
      draggable: false,
      position: position,
      className: "inputEvent"
    }
    const subEvents = data.subEvents
    const subEventsPool = subEvents.map((event, index) => {
      // основные
      const idPool = []
      adges.push({
        id: `e${firstNode.id}`,
        source: firstNode.id,
        target: event.id,
        type: edgeType,
        animated: true
      })
      idPool.push(`e${firstNode.id}`)
      // конец отработки
      const outId = uuidv4()
      const endEvent = {
        id: outId,
        type: 'output',
        className: "output-event",
        data: {
          label: 'ФИНИШ',
          complete: false,
          handleDel: handleDel
        },
        style: { backgroundColor: 'red', color: '#fff' },
        draggable: false,
        position
      }
      idPool.push(outId)
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
        idPool.push(`sht${event.id}`)
        elements.push({
          id: shtId,
          type: 'event',
          className: 'simple-event',
          data: {
            label: 'ПТС',
            complete: false

          },
          position: position,
          style: { backgroundColor: 'red', color: '#fff' },
          draggable: false
        })
        idPool.push(shtId)
        // начало - ШТ
        adges.push({
          id: `tosht${event.id}`,
          source: event.id,
          target: shtId,
          type: edgeType,
          animated: true,
          label: 'Доклад',
          labelStyle: { fill: 'red', fontWeight: 700, fontSize: '12px' },
        })
        idPool.push(`tosht${event.id}`)
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
        idPool.push(`tlf${firstNode.id}`)
        elements.push({
          id: tlfId,
          type: 'event',
          className: 'simple-event',
          data: {
            label: 'ШТ',
            complete: false
          },
          position: position,
          style: { backgroundColor: 'red', color: '#fff' },
          draggable: false
        })
        idPool.push(tlfId)
        // начало - ПТС
        adges.push({
          id: `totlf${event.id}`,
          source: event.id,
          target: tlfId,
          type: edgeType,
          animated: true,
          label: 'Доклад',
          labelStyle: { fill: 'red', fontWeight: 700, fontSize: '12px' },
        })
        idPool.push(`totlf${event.id}`)
      }
      if (!event.shtReport && !event.tlfReport) {
        adges.push({
          id: `mtoend${event.id}`,
          source: event.id,
          target: endEvent.id,
          type: edgeType,
          animated: true
        })
        idPool.push(`mtoend${event.id}`)
      }
      const mainEvent = {
        id: event.id,
        type: 'mainEvent',
        className: 'main-event',
        data: {
          eventId: event.id,
          handleDone: handleDone,
          label: eTypes[event.type].title,
          deadline: event.deadline,
          comments: event.comments,
          complete: false
        },
        style: { backgroundColor: 'red', color: '#fff' },
        position: position,
        draggable: false
      }
      elements.push({
        ...endEvent,
        data: {
          ...endEvent.data,
          relativePool: idPool,
          mainIn: firstNode.id
        }
      })
      idPool.push(event.id)
      return mainEvent
    })
    // цепочки
    const test = [
      firstNode,
      ...elements,
      ...subEventsPool,
      ...adges
    ]
    let newEventsChain = []
    if (events.length) {
      newEventsChain = [
        ...events,
        ...test
      ]
    } else {
      newEventsChain = test
    }
    setEvents(newEventsChain)
    setEUpdate(prevState => (prevState + 1))
    localStorage.setItem('chain', JSON.stringify(newEventsChain))
  }

  const handleDone = (data) => {
    setEvents(prevState => (
      prevState.map((item, index) => {
        if (isNode(item) && item.id === data.eventId) {
          return {
            ...item,
            data: {
              ...item.data,
              complete: true,
              completeTime: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
            }
          }
        }
        return item
      })
    ))
    setEUpdate(prevState => (prevState + 1))
  }

  const handleDel = (data) => {
    const relatives = data.relativePool
    const mainInput = data.mainIn
    setEvents(prevState => {
      const prevStateUp = prevState.filter((item) => {
        if (relatives.includes(item.id)) {
          return false
        }
        return true
      })
      return prevStateUp.filter(item => {
        if (isNode(item) && item.id === mainInput) {
          if (getOutgoers(item, prevStateUp).length) return true
          return false
        }
        return true
      })
    })
    setEUpdate(prevState => (prevState + 1))
  }
  

  return (
    <Fragment>
      <ConfirmDialog />
      <div className="main-wrap">
        <Grid container style={{ height: 'inherit' }}>
          <Grid item xs={12} sm={9}>
            <div className="flow-wrap">
              {events &&
                <EventChain events={events} newone={eUpdate} />
              }
            </div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div className="info-wrap">
              <Info />
            </div>
          </Grid>
        </Grid>

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