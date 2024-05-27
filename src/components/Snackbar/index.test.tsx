import { render, screen, fireEvent } from '@testing-library/react'
import Snackbar from './index'
import { vi } from 'vitest'

describe('Snackbar component', () => {
  it('renders snackbar message when open', () => {
    const snackbarMessage = 'Test message'
    const setIsSnackbarOpen = vi.fn()
    const { getByText } = render(
      <Snackbar isSnackbarOpen={true} snackbarMessage={snackbarMessage} setIsSnackbarOpen={setIsSnackbarOpen} />
    )
    expect(getByText(snackbarMessage)).toBeInTheDocument()
  })

  it('calls setIsSnackbarOpen when snackbar is closed', () => {
    const setIsSnackbarOpen = vi.fn()
    render(<Snackbar isSnackbarOpen={true} snackbarMessage='Test message' setIsSnackbarOpen={setIsSnackbarOpen} />)
    fireEvent.click(screen.getByRole('button'))
    expect(setIsSnackbarOpen).toHaveBeenCalledWith(false)
  })
})
