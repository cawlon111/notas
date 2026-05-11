import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  // 👇 Cambiado a español
  const button = screen.getByText('hacer no importante')
  await user.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})

test('when note is not important, button shows "hacer importante"', () => {
  const note = {
    content: 'Nota no importante',
    important: false
  }

  render(<Note note={note} />)

  const button = screen.getByText('hacer importante')
  expect(button).toBeDefined()
})