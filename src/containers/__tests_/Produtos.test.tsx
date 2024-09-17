import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'

import { renderizaComProvider } from '../../utils/tests'
import Produtos from '../Produtos'

const mocks = [
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
    plataforma: 'windows',
    preco: 200,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataforma: ['PS5', 'Xbox Series S/X'],
    preco: 189.9,
    titulo: 'Gotham Knights'
  },
  {
    id: 4, // Corrigi o ID duplicado
    categoria: 'RPG',
    imagem: '',
    plataforma: ['Nintendo Switch'], // Corrigi o erro de digitação "Nitendo" -> "Nintendo"
    preco: 299.9,
    titulo: 'Donkey Kong'
  }
]

// Setup do servidor de mock
const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, context) => {
      return resposta(context.json(mocks)) // Corrigi "parseConfigFileTextToJson.json" para "context.json"
    }
  )
)

describe('Testes para o container Produtos', () => {
  beforeAll(() => server.listen()) // Inicia o mock server antes de todos os testes
  afterEach(() => server.resetHandlers()) // Reseta os handlers após cada teste
  afterAll(() => server.close()) // Fecha o mock server após todos os testes

  test('Deve renderizar corretamente enquanto carrega', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug() // Depuração, pode ser removido em testes finais
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument() // Verifica se o item está sendo renderizado
    })
  })
})
