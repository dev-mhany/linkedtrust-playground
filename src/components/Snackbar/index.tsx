import MUISnackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const Snackbar = ({ isSnackbarOpen, snackbarMessage, setIsSnackbarOpen }: any) => (
  <MUISnackbar
    open={isSnackbarOpen}
    autoHideDuration={3000}
    onClose={() => setIsSnackbarOpen(false)}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
  >
    <Alert onClose={() => setIsSnackbarOpen(false)} severity='info' sx={{ width: '100%' }}>
      {snackbarMessage}
    </Alert>
  </MUISnackbar>
)

export default Snackbar
