'use strict'

export class Produtos {

  constructor(
    model = null,
    description = null,
    _id = null
  ) {
    this.model = model
    this.description = description
    this._id = _id
  }
}