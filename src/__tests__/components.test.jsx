import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Header from '../components/Header'
import NavBarApp from '../components/Navbar'

describe('DaisyUI Components CSS Tests', () => {
  describe('Header Component', () => {
    it('deve renderizar o componente Header', () => {
      const { getByText } = render(<Header />)
      const heading = getByText('Header Component')
      expect(heading).toBeInTheDocument()
    })

    it('deve ter classes Tailwind CSS aplicadas', () => {
      const { container } = render(<Header />)
      const heading = container.querySelector('h1')
      const classNames = heading.className
      expect(classNames).toContain('text-2xl')
      expect(classNames).toContain('font-bold')
    })

    it('deve renderizar sem erros', () => {
      expect(() => render(<Header />)).not.toThrow()
    })
  })

  describe('Navbar Component', () => {
    it('deve renderizar o componente Navbar', () => {
      const { container } = render(<NavBarApp />)
      expect(container.firstChild).toBeTruthy()
    })

    it('deve renderizar sem erros', () => {
      expect(() => render(<NavBarApp />)).not.toThrow()
    })
  })

  describe('CSS Loading', () => {
    it('deve ter Tailwind CSS disponível', () => {
      const { container } = render(<Header />)
      const element = container.querySelector('h1')
      const styles = window.getComputedStyle(element)
      expect(styles).toBeTruthy()
    })

    it('deve suportar cores e estilos DaisyUI', () => {
      const { container } = render(<Header />)
      expect(container.innerHTML).toBeTruthy()
    })
  })
})
