import { render } from '@testing-library/react'
import PDFViewer from '../PDFViewer'

describe('PDFViewer', () => {
  it('should render canvas element', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' })
    const { container } = render(<PDFViewer file={file} />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})
