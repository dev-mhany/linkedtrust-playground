import React from 'react'
import Dialog from '@mui/material/Dialog'
import IHomeProps from '../../containers/Form/types'
import { Form } from '../Form'

const FormDialog = ({
  open,
  setOpen,
  setIsSnackbarOpen,
  setSnackbarMessage,
  selectedClaim,
  setLoading
}: IHomeProps & { open: boolean; setOpen: (open: boolean) => void; selectedClaim: any }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Form
          setIsSnackbarOpen={setIsSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          setLoading={setLoading}
          selectedClaim={selectedClaim}
          onCancel={handleClose}
          toggleSnackbar={function (toggle: boolean): void {
            throw new Error('Function not implemented.')
          }}
        />
      </Dialog>
    </div>
  )
}
export default FormDialog
