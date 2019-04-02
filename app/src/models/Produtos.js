'use strict'

export class Produtos {

  constructor(
    model = null,
    description = null,
    sizes = [],
    _id = null
  ) {
    this.model = model
    this.description = description
    this.sizes = sizes
    this._id = _id
  }
}