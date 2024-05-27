interface IHomeProps {
  setIsSnackbarOpen: (toggle: boolean) => void
  setSnackbarMessage: (message: string) => void
  setLoading: (isLoading: boolean) => void
  toggleSnackbar: (toggle: boolean) => void
}

export default IHomeProps
