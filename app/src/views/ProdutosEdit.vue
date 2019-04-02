<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      justify-center
      align-center
    >
      <v-flex>
        <v-card
          color="white"
          width="100%"
        >
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="" ref="form">
              <v-container>
                <v-layout row wrap>
                  <v-flex
                    xs12
                    md12
                  >
                    <v-text-field
                      v-model="formFields.model"
                      :rules="[formRules.default.required]"
                      label="Model"
                      required
                    ></v-text-field>
                  </v-flex>               
                  <v-flex
                    xs12
                    md12
                  >
                    <v-textarea
                      v-model="formFields.description"
                      label="Description"
                      required
                      :rules="[formRules.default.required]"
                    />
                  </v-flex>                              
                </v-layout>
                <v-layout row wrap>
                   <v-subheader>
                     Tamanhos
                   </v-subheader>
                </v-layout>
                <v-layout
                  v-for="(size, key) of formFields.sizes"
                  :key="key"
                  row
                  wrap
                  style="background-color:#eee; margin-bottom: 10px;"
                  align-center
                >
                  <v-flex
                    xs12
                    md11
                  >
                    <v-layout row wrap>
                      <v-flex
                        xs12
                        md10
                        class="subitem"
                      >
                        <v-text-field
                          v-model="size.description"
                          label="Description"
                          :rules="[formRules.default.required]"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex
                        xs12
                        md2
                        class="subitem"
                      >
                        <v-text-field
                          v-model="size.stock"
                          label="Stock"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    md1
                  >
                    <v-btn color="error" fab small dark @click="removeSize(key)" title="Remover tamanho">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex
                    xs12
                    md2
                  >
                  <v-btn color="primary" large dark title="Adicionar novo tamanho" @click="addSize">
                    <v-icon>mdi-library-plus</v-icon>
                    Adicionar tamanho
                  </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              large
              :loading="loading"
              @click="save"
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { ProdutosController } from "../controllers/ProdutosController"

import { mapMutations } from "vuex"

export default {
  data() {
    return {
      loading: false,
      valid: false,
      formFields: {},
      formRules: {
        default: {
          required: value => !!value || "Campo obrigatório"
        }
      },

    }
  },

  methods: {
    ...mapMutations([
      "SHOW_ALERT",
      "SET_TOOLBAR_BACK_URL",
      "SHOW_LOADER",
      "CLOSE_LOADER"
    ]),

    async loadEntity() {
      this.SHOW_LOADER()

      let produtosController = new ProdutosController()
      let result = await produtosController.get(this.getEntityID())

      this.CLOSE_LOADER()

      if (!result.error) {
        this.formFields = result.data.data
      } else {
        this.SHOW_ALERT({
          type: "error",
          message: result.message
        })

        this.$router.push({ path: `/produtos` })
      }
    },

    async save() {
      if (this.valid) {
        this.loading = true

        let produtosController = new ProdutosController()
        let result = await produtosController.update(this.formFields)

        this.SHOW_ALERT({
          type: result.error ? "error" : "success",
          message: result.message
        })

        this.loading = false
      }else {
        this.$refs.form.validate()
      }
    },

    getEntityID() {
      return this.$route.params.id
    },

    pickFile () {
      this.$refs.file.click ()
    },

    handleFileUpload(){
      this.file = this.$refs.file.files[0]
    },

    addSize() {
      this.formFields.sizes.push(ProdutosController.getSizeModel())
    },

    removeSize(key) {
      this.formFields.sizes.splice(key,1)
    },
  },

  async created() {
    this.SET_TOOLBAR_BACK_URL('/produtos')
    await this.loadEntity()
  }
}
</script>

<style lang="scss">
  .subitem {
    padding: 8px;
  }
</style>