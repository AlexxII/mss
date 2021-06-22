import React, { Fragment, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import { isNode, getOutgoers, isEdge } from 'react-flow-renderer';

import SpeedAdd from '../../components/SpeedAdd'
import EventChain from '../../components/EventChain'
import AddDialog from '../../components/AddDialog'
import Info from '../../components/Info'
import ConfirmDialog from '../../components/ConfirmDialog'
import eventsTypes from '../../constants/inarray'
import { updateLocale } from 'moment';

const Main = () => {
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState([])
  const [eUpdate, setEUpdate] = useState(false)

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
              handleDone,
              handleChainDel,
              handleInUpdate,
              handleAddChain,
              handleMainDel,
              handleMainUpdate
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
    setOpen(false)
    const position = { x: 0, y: 0 };
    const main = data.main
    const mainId = uuidv4()
    const firstNode = {
      id: mainId,
      type: 'input',
      data: {
        id: mainId,
        label: main.title,
        comments: main.comments,
        date: main.startDate,
        handleMainDel,
        handleInUpdate,
        handleAddChain
      },
      draggable: false,
      position: position,
      className: "inputEvent"
    }
    const subEvents = data.subEvents
    console.log(subEvents);
    const { elementsPool, childsPool } = formElements(subEvents, mainId)
    const chains = [
      {
        ...firstNode,
        data: {
          ...firstNode.data,
          childsPool
        }
      },
      ...elementsPool
    ]
    setEvents(prevState => ([
      ...prevState,
      ...chains
    ]))
    setEUpdate(prevState => (prevState + 1))
  }

  const formElements = (subEvents, inId) => {
    const edgeType = 'straight';
    const position = { x: 0, y: 0 };
    const events = subEvents.reduce((acum, event) => {
      const relativePool = []
      // основные
      const mainEdgeId = `e${event.id}`
      acum.push({
        id: mainEdgeId,
        source: inId,
        target: event.id,
        type: edgeType,
        animated: true
      })
      relativePool.push(mainEdgeId)
      // добавлять в пул не надо -> пойдет отельным полем у детей
      // конец отработки
      const outId = uuidv4()
      const endEvent = {
        id: outId,
        type: 'output',
        className: "output-event",
        data: {
          label: 'ФИНИШ',
          complete: false,
          handleChainDel
        },
        style: { backgroundColor: 'red', color: '#fff' },
        draggable: false,
        position
      }
      relativePool.push(outId)
      // ПТС - ШТ
      if (event.shtReport) {
        const shtId = uuidv4()
        // ШТ - конец
        acum.push({
          id: `sht${event.id}`,
          source: shtId,
          target: endEvent.id,
          type: edgeType,
          animated: true
        })
        relativePool.push(`sht${event.id}`)

        acum.push({
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
        relativePool.push(shtId)

        // начало - ШТ
        acum.push({
          id: `tosht${event.id}`,
          source: event.id,
          target: shtId,
          type: edgeType,
          animated: true,
          label: 'Доклад',
          labelStyle: { fill: 'red', fontWeight: 700, fontSize: '12px' },
        })
        relativePool.push(`tosht${event.id}`)
      }
      if (event.tlfReport) {
        const tlfId = uuidv4()
        // ПТС - конец
        acum.push({
          id: `tlf${event.id}`,
          source: tlfId,
          target: endEvent.id,
          type: edgeType,
          animated: true
        })
        relativePool.push(`tlf${event.id}`)
        acum.push({
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
        relativePool.push(tlfId)
        // начало - ПТС
        acum.push({
          id: `totlf${event.id}`,
          source: event.id,
          target: tlfId,
          type: edgeType,
          animated: true,
          label: 'Доклад',
          labelStyle: { fill: 'red', fontWeight: 700, fontSize: '12px' },
        })
        relativePool.push(`totlf${event.id}`)
      }
      if (!event.shtReport && !event.tlfReport) {
        acum.push({
          id: `mtoend${event.id}`,
          source: event.id,
          target: endEvent.id,
          type: edgeType,
          animated: true
        })
        relativePool.push(`mtoend${event.id}`)
      }
      acum.push({
        id: event.id,
        type: 'mainEvent',
        className: 'main-event',
        data: {
          eventId: event.id,
          handleDone,
          handleMainUpdate,
          type: event.type,
          deadline: event.deadline,
          comments: event.comments,
          complete: false
        },
        style: { backgroundColor: 'red', color: '#fff' },
        position: position,
        draggable: false
      })
      relativePool.push(event.id)
      acum.push({
        ...endEvent,
        data: {
          ...endEvent.data,
          relativePool,
          mainIn: inId,
          mainEdgeId
        }
      })
      return acum
    }, [])
    return {
      elementsPool: events,
      childsPool: events.map(item => item.id)
    }
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

  const handleInUpdate = (data) => {
    setEvents(prevState => {
      return prevState.map(item => item.id === data.id ?
        {
          ...item,
          data: {
            ...item.data,
            label: data.title,
            comments: data.comments,
            date: data.inputTime
          }
        }
        :
        item
      )
    })
    setEUpdate(prevState => (prevState + 1))
  }

  const handleMainUpdate = (uData) => {
    let completeTime = false
    if (uData.complete) {
      completeTime = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    }
    setEvents(prevState => (
      prevState.map(item => item.id === uData.id ? {
        ...item,
        data: {
          ...item.data,
          type: uData.type,
          deadline: uData.deadline,
          complete: uData.complete,
          completeTime: completeTime,
          comments: uData.comments
        }
      }
        : item
      )
    ))
    setEUpdate(prevState => (prevState + 1))
  }

  const handleAddChain = (data) => {
    const subEvents = data.subEvents
    const inId = data.inId
    const { elementsPool, childsPool } = formElements(subEvents, inId)
    setEvents(prevState => {
      let prevStateUp = prevState.map(item =>
        item.id === inId ? {
          ...item,
          data: {
            ...item.data,
            childsPool: [
              ...item.data.childsPool,
              ...childsPool
            ]
          }
        } : item)
      return [
        ...prevStateUp,
        ...elementsPool
      ]
    })
    setEUpdate(prevState => (prevState + 1))
  }

  const handleChainDel = (data) => {
    const relatives = data.relativePool
    const mainInput = data.mainIn
    const mainEdgeId = data.mainEdgeId
    let edgeDel = false
    setEvents(prevState => {
      const prevStateUp = prevState.filter((item) => {
        if (relatives.includes(item.id)) {
          return false
        }
        return true
      })
      const prevStateUpUp = prevStateUp.filter(item => {
        if (isNode(item) && item.id === mainInput) {
          if (getOutgoers(item, prevState).length > 1) {
            edgeDel = true
            return true
          }
          edgeDel = true
          return false
        }
        return true
      })
      if (edgeDel) {
        return prevStateUpUp.filter(item => {
          if (isEdge(item) && item.id === mainEdgeId) {
            return false
          }
          return true
        })
      }
      return prevStateUp
    })
    setEUpdate(prevState => (prevState + 1))
  }

  const handleMainDel = (data) => {
    const inId = data.id
    const childsPool = data.childsPool
    setEvents(prevState => {
      return prevState.filter(item => {
        if (childsPool.includes(item.id) || item.id === inId) {
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
              {events.length ?
                <EventChain events={events} newone={eUpdate} />
                :
                null
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