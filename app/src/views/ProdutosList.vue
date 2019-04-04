<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-card
          color="white"
          width="100%"
        >
          <v-card-title>
            <v-btn
              color="primary"
              large
              to="products/add"
            >
              <v-icon dark>add</v-icon>
              Add new product
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <custom-data-table
              v-model="tableIpunt"
              :headers="headers"
              :table-data="tableData"
              :filters="filters"
              :default-sort="defaultSort"
              @onDeleteItem="onDeleteItem($event)"
              @onEditItem="onEditItem($event)"
            >
              <template
                slot="filter"
                slot-scope="props"
              >
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Model"
                    clearable
                    v-model="props.filters.model"
                  ></v-text-field>
                </v-flex>
              </template>
              <template
                slot="items"
                slot-scope="props"
              >
                <td>{{ props.item.model }}</td>
                <td v-html="getSizesInfo(props.item.sizes)"></td>
                <td>{{ props.item.stock }}</td>
              </template>
              <template
                slot="actions"
                slot-scope="props"
              >
                <v-btn
                  small
                  flat
                  fab
                  title="Comprar item"
                  @click="onBuyItem(props.item)"
                >
                  <v-icon>mdi-cart-arrow-down</v-icon>
                </v-btn>
              </template>
            </custom-data-table>
          </v-card-text>
        </v-card>
      </v-flex>

      <product-sale-light-form
        v-model="productToSale"
        @success="onPurchase()"
      />
    </v-layout>
  </v-container>
</template>

<script>
import CustomDataTable from "./../components/shared/CustomDataTable/CustomDataTable"
import ProductSaleLightForm from "./../components/shared/ProductSaleLightForm/ProductSaleLightForm"

import { ProductsController } from "../controllers/ProductsController"

import { mapMutations } from "vuex"

export default {
  components: {
    CustomDataTable,
    ProductSaleLightForm
  },

  data() {
    return {
      filters: {
        nome: ""
      },

      defaultSort: "model",
      headers: [
        {
          text: "Model",
          align: "left",
          sortable: true,
          value: "model"
        },
        {
          text: "Sizes",
          align: "left",
          sortable: false,
          value: "sizes"
        },
        {
          text: "Stock",
          align: "left",
          sortable: false,
          value: "stock"
        }
      ],
      tableData: {
        data: [],
        total: 0
      },
      tableIpunt: {},

      productToSale: {}
    }
  },

  methods: {
    ...mapMutations(["SHOW_ALERT","SHOW_LOADER","CLOSE_LOADER"]),

    async getData() {
      let filters = this.tableIpunt.filters
      let pagination = this.tableIpunt.pagination

      let productsController = new ProductsController()
      let result = await productsController.list(
        filters,
        pagination.page,
        pagination.rowsPerPage,
        pagination.sortBy,
        pagination.descending
      )

      if (result.error) {
        this.tableData = []
      } else {
        this.tableData = result.data.data
      }
    },

    async onDeleteItem(item) {
      this.SHOW_LOADER()
      let productsController = new ProductsController()
      let result = await productsController.delete(item)
      this.CLOSE_LOADER()

      this.SHOW_ALERT({
        type: result.error ? "error" : "success",
        message: result.message
      })

      if (!result.error) this.getData()
    },

    onEditItem(item) {
      this.$router.push({ path: `/products/editar/${item}` })
    },

    formatCategorias (categorias){
      return categorias ? categorias.map(item => item.nome).join(' | ') : ''
    },

    onBuyItem(item) {
      this.productToSale = item
    },

    getSizesInfo(sizes) {

      if(sizes){
        return sizes.map(item => {
          let zeroedOutIn = item.zeroedOutIn ? `/ Zeroed Out In: ${item.zeroedOutIn} H` : ''
          return `<b>${item.description}</b> - Stock:${item.stock ? item.stock : 0} ${zeroedOutIn}`
        }).join("<br/>")
      } else {
        return false
      }
    },
    onPurchase(){
      this.getData()
    }
  },

  watch: {
    tableIpunt: {
      handler () {
        this.getData()
      },
      deep: true
    }
  }
}
</script>