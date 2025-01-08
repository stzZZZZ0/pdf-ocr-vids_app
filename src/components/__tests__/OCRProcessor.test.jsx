import { render } from '@testing-library/react'
import OCRProcessor from '../OCRProcessor'

describe('OCRProcessor', () => {
  it('should not render any visible elements', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' })
    const { container } = render(<OCRProcessor file={file} setText={jest.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })
})
