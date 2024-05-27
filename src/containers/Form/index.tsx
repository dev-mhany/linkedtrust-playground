import IHomeProps from './types'
import { Form } from '../../components/Form'
import { Paper } from '@mui/material'
import BackgroundImages from '../BackgroundImags'

const FormPage = ({ setIsSnackbarOpen, setSnackbarMessage, setLoading }: IHomeProps) => {
  return (
    <>
      <BackgroundImages />
      <Paper sx={{ zIndex: 20, my: 10, marginTop: { xs: 20, md: 10 } }}>
        <Form
          setIsSnackbarOpen={setIsSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          setLoading={setLoading}
          toggleSnackbar={function (toggle: boolean): void {
            throw new Error('Function not implemented.')
          }}
        />
      </Paper>
    </>
  )
}

export default FormPage
