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
              to="produtos/adicionar"
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
              :default-descending="defaultDescending"
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
              </template>
            </custom-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CustomDataTable from "./../components/shared/CustomDataTable/CustomDataTable"

import { ProdutosController } from "../controllers/ProdutosController"

import { mapMutations } from "vuex"

export default {
  components: {
    CustomDataTable
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
        }
      ],
      tableData: {
        data: [],
        total: 0
      },
      tableIpunt: {}
    }
  },

  methods: {
    ...mapMutations(["SHOW_ALERT","SHOW_LOADER","CLOSE_LOADER"]),

    async getData() {
      let filters = this.tableIpunt.filters
      let pagination = this.tableIpunt.pagination

      let produtosController = new ProdutosController()
      let result = await produtosController.list(
        filters,
        pagination.page,
        pagination.rowsPerPage,
        pagination.sortBy,
        pagination.descending
      )

      if (result.error) {
        this.tableData = []
      } else {
        this.tableData = result.data
      }
    },

    async onDeleteItem(item) {
      this.SHOW_LOADER()
      let produtosController = new ProdutosController()
      let result = await produtosController.delete(item)
      this.CLOSE_LOADER()

      this.SHOW_ALERT({
        type: result.error ? "error" : "success",
        message: result.message
      })

      if (!result.error) this.getData()
    },

    onEditItem(item) {
      this.$router.push({ path: `/produtos/editar/${item}` })
    },

    formatCategorias (categorias){
      return categorias ? categorias.map(item => item.nome).join(' | ') : ''
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