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
    path: '/products',
    view: 'ProdutosList',
    meta: {
      title: 'Products',
    },
  },
  {
    path: '/products/add',
    view: 'ProdutosAdd',
    meta: {
      title: 'Add new product',
    },
  },
  {
    path: '/products/editar/:id',
    view: 'ProdutosEdit',
    meta: {
      title: 'Edit product',
    },
  },
]