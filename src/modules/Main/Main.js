import React, { Fragment, useState } from 'react'

import SpeedAdd from '../../components/SpeedAdd'
import AddDialog from '../../components/AddDialog'

const Main = () => {
  const [open, setOpen] = useState(false)

  const handleEventAdd = (data) => {
    console.log(data);
    setOpen(false)
  }

  return (
    <Fragment>
      <AddDialog open={open} setOpen={setOpen} save={handleEventAdd} />
      <SpeedAdd openAddDialog={() => setOpen(true)} />
    </Fragment>
  )
}

export default Main