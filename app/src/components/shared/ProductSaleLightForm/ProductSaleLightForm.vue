<template>
  <v-light-form
    ref="lightForm"
    title="Registrar compra"
    tooltip-text="Registrar compra"
    :loading="loading"
    :rules="{required:formRules.default.required}"
    :required-data-empty="isRequiredDataEmpty"
    :required-data-empty-text="'Este produto não possui <b>tamanhos</b> para registrar a compra.'"
    :show-tooltip="false"
    :show="show"
    @confirm="save($event)"
    @onClose="close()"
  >
    <template
      slot="form"
      slot-scope="props"
    >
      <v-flex
        xs12
      >
        <v-text-field
          v-model="product.model"
          label="Model"
          disabled
        ></v-text-field>
      </v-flex>
    </template>
  </v-light-form>
</template>

<script>
import { mapMutations } from "vuex"
import VLightForm from "../VLightForm/VLightForm"

export default {
  components:{
    VLightForm
  },
  props: {
      value: {
          required: true
      }
  },
  data () {
    return {
      loading: false,
      formRules: {
        default: {
          required: value => !!value || "Campo obrigatório"
        }
      },

      show: false,
      product: false
    }
  },
  watch:{
      value: function(nv) {
          if(nv != this.product) {
              this.product = nv
              this.show = true
          }
      },
      product: function(nv) {
          if(nv != this.value) {
              this.$emit("input",nv)
          }
      }
  },
  computed: {
    isRequiredDataEmpty () {
      if(this.product)
        return this.product.sizes ? false : true
      else
        return false
    }
  },
  methods: {
    ...mapMutations([
      "SHOW_ALERT",
    ]),

    async save(fields) {
    //   this.loading = true

    //   let veiculosController = new VeiculosController()
    //   let result = await veiculosController.create(fields)

    //   this.SHOW_ALERT({
    //     type: result.error ? "error" : "success",
    //     message: result.message
    //   })

    //   if (!result.error){
    //     this.$refs.lightForm.closeDialog()
    //     this.$emit('success', result.data)
    //   }

    //   this.loading = false
    },

    close() {
        this.show = false
        this.product = false
    }
  }
}
</script>