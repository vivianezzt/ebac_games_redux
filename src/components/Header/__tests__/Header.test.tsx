import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '..'
import { renderizaComProvider } from '../../../utils/tests'

describe('Testes para o comportamento header', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })
  test('Deve renderizar com dois itens no carrinho', () => {
    renderizaComProvider(<Header />, {
      preloadState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: '',
              plataforma: 'windows',
              preco: 169.9,
              titulo: 'Elden Ring'
            },
            {
              id: 2,
              categoria: 'RPG',
              imagem: '',
              plataforma: ['windows', 'PS5', 'Xbox Series'],
              preco: 199.9,
              titulo: 'Hogwarts Legacy'
            }
          ]
        }
      }
    })
    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
