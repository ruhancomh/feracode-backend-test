export default [
  {
    path: '/',
    name: 'Home',
    view: 'ProdutosList',
    meta: {
      title: 'Produtos',
    },
  },

  // Produtos
  {
    path: '/produtos',
    view: 'ProdutosList',
    meta: {
      title: 'Produtos',
    },
  },
  {
    path: '/produtos/adicionar',
    view: 'ProdutosAdd',
    meta: {
      title: 'Adicionar novo produto',
    },
  },
  {
    path: '/produtos/editar/:id',
    view: 'ProdutosEdit',
    meta: {
      title: 'Editar produto',
    },
  },
]