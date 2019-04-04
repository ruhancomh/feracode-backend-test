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
                     SIZES
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
                    <v-btn color="error" fab small dark @click="removeSize(key)" title="Delete size">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex
                    xs12
                    md2
                  >
                  <v-btn color="primary" large dark title="Add new size" @click="addSize">
                    <v-icon>mdi-library-plus</v-icon>
                     Add Size
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
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { ProductsController } from "../controllers/ProductsController"

import { mapMutations } from "vuex"

export default {
  data() {
    return {
      loading: false,
      valid: false,
      formFields: {},
      formRules: {
        default: {
          required: value => !!value || "Required field"
        }
      },

    }
  },

  methods: {
    ...mapMutations(["SHOW_ALERT","SET_TOOLBAR_BACK_URL"]),

    async save() {
      if (this.valid) {
        this.loading = true

        let productsController = new ProductsController()
        let result = await productsController.create(this.formFields)

        this.SHOW_ALERT({
          type: result.error ? "error" : "success",
          message: result.message
        })

        if (!result.error)
          this.$router.push({ path: "/products" })

        this.loading = false
      }else {
        this.$refs.form.validate()
      }
    },

    pickFile () {
      this.$refs.file.click ()
    },

    handleFileUpload(){
      this.file = this.$refs.file.files[0]
    },

    addSize() {
      this.formFields.sizes.push(ProductsController.getSizeModel())
    },

    removeSize(key) {
      this.formFields.sizes.splice(key,1)
    },
  },

  created() {
    this.SET_TOOLBAR_BACK_URL('/products')
    this.formFields = ProductsController.getModel()
  }
}
</script>

<style lang="scss">
  .subitem {
    padding: 8px;
  }
</style>
