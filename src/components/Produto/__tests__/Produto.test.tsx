import { screen, fireEvent } from '@testing-library/react'
import Produto from '..'

import { renderizaComProvider } from '../../../utils/tests'
import { Provider } from 'react-redux'

const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: '',
  plataforma: ['windows', 'PS5', 'Xbox Series'],
  preco: 199.9,
  titulo: 'Hogwarts Legacy'
}

describe('Testes para o comportamento do produto', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
  })
  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)
    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
