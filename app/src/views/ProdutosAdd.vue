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

      categoriasOptions: [],
      categoriasOptionsLoad: false,
      categoriasOptionsSearch: '',

      file:'',
    }
  },

  computed: {
    imageName() {
      if(this.file){
        return this.file.name
      }
    },

    imageUrl() {
      if(this.file){
        let fr = new FileReader ()
        fr.readAsDataURL(this.file)
        fr.addEventListener('load', () => {
          return fr.result
        })
      }
    }
  },

  methods: {
    ...mapMutations(["SHOW_ALERT","SET_TOOLBAR_BACK_URL"]),

    async save() {
      if (this.valid) {
        this.loading = true

        this.formFields.file = this.file

        let produtosController = new ProdutosController()
        let result = await produtosController.create(this.formFields)

        this.SHOW_ALERT({
          type: result.error ? "error" : "success",
          message: result.message
        })

        if (!result.error)
          this.$router.push({ path: "/produtos" })

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
    }
  },

  created() {
    this.SET_TOOLBAR_BACK_URL('/produtos')
    this.formFields = new ProdutosController().getModel()
  }
}
</script>