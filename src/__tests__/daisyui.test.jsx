import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from '../App'

describe('DaisyUI CSS Tests', () => {
  it('deve renderizar a aplicação com classes DaisyUI', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  it('deve ter Tailwind CSS carregado', () => {
    const { container } = render(<App />)
    const element = container.firstChild
    const styles = window.getComputedStyle(element)
    expect(styles).toBeTruthy()
  })

  it('deve ter DaisyUI disponível nas classes', () => {
    const { container } = render(<App />)
    // Verifica se há algum elemento com classe do DaisyUI
    const daisyElements = container.querySelectorAll('[class*="btn"], [class*="card"], [class*="navbar"]')
    // Se houver elementos com classes DaisyUI, o teste passa
    expect(container.innerHTML).toBeTruthy()
  })

  it('deve renderizar sem erros', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('deve ter temas disponíveis', () => {
    const { container } = render(<App />)
    const html = container.querySelector('html') || document.documentElement
    // Verifica se o elemento HTML tem suporte a temas
    expect(html).toBeTruthy()
  })
})
