<template>
  <v-light-form
    ref="lightForm"
    title="Register purchase"
    tooltip-text="Register purchase"
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
      <v-flex
        xs6
      >
        <v-select
          v-model="props.fields.product_size"
          :items="product.sizes"
          label="Size"
          item-text="description"
          item-value="_id"
          :rules="[formRules.default.required]"
          required
        >
          <template v-slot:item="data">
            <v-list-tile-content v-if="data.item">
              <v-list-tile-title v-html="data.item.description"></v-list-tile-title>
              <v-list-tile-sub-title>Sotck : {{ data.item.stock }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
      <v-flex
        xs6
      >
        <v-text-field
          v-model="props.fields.quantity"
          label="Quantity"
          type="number"
          :rules="[formRules.default.required]"
          required
        ></v-text-field>
      </v-flex>
    </template>
  </v-light-form>
</template>

<script>
import { ProductPurchasesController } from "../../../controllers/ProductPurchasesController"
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
      if(!this.hasStock(fields.product_size, fields.quantity)){
        this.SHOW_ALERT({
          type: "error",
          message: "The selected quantity exceeds the current stock"
        })
        return false
      }

      this.loading = true

      let controller = new ProductPurchasesController()
      let result = await controller.create(fields)

      this.SHOW_ALERT({
        type: result.error ? "error" : "success",
        message: result.message
      })

      if (!result.error){
        this.$refs.lightForm.closeDialog()
        this.$emit('success', result.data)
      }

      this.loading = false
    },

    close() {
        this.show = false
        this.product = false
    },

    hasStock(sizeId,quantity) {
      if(this.product.sizes.find(item => item._id == sizeId).stock < quantity){
        return false
      } else {
        return true
      }
    }
  }
}
</script>