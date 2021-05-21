import React, { Fragment, useState } from 'react'

import SpeedAdd from '../../components/SpeedAdd'
import AddDialog from '../../components/AddDialog'
import EventChain from '../../components/EventChain'

const Main = () => {
  const [open, setOpen] = useState(false)

  const handleEventAdd = (data) => {
    setOpen(false)
  }

  return (
    <Fragment>
      <div className="main-wrap">
        <EventChain />
        <AddDialog open={open} setOpen={setOpen} save={handleEventAdd} />
        <SpeedAdd setAddOpen={() => setOpen(true)} />
      </div>
    </Fragment>
  )
}

export default Main