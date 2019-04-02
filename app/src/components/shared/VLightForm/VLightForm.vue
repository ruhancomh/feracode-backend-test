<template>
  <div class="v-light-form">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          fab
          flat
          dark
          color="primary"
          v-on="on"
          @click="showDialog()"
        >
          <v-icon dark>mdi-library-plus</v-icon>
        </v-btn>
      </template>
      <span>{{tooltipText}}</span>
    </v-tooltip>
    <v-dialog
      v-if="!requiredDataEmpty"
      v-model="dialogActive"
      :lazy="true"
      :max-width="maxWidth"
    >
      <v-card>
        <v-card-title
          class="headline"
          v-if="title"
        >{{ title }}</v-card-title>
        <v-card-text>
          <v-form
            v-model="formValid"
            @submit.prevent=""
            ref="form"
          >
            <v-layout
              row
              wrap
            >
              <slot
                name="form"
                v-bind:fields="formFields"
                v-bind:rules="rules"
              ></slot>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat="flat"
            @click="closeDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            flat="flat"
            :loading="loading"
            @click="confirm()"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-else
      v-model="dialogActive"
      :lazy="true"
      :max-width="maxWidth"
    >
      <v-card>
        <v-card-title
          class="headline"
          v-if="title"
        >{{ title }}</v-card-title>
        <v-card-text v-html="requiredDataEmptyText">
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            flat="flat"
            @click="closeDialog()"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ""
    },
    tooltipText: {
      default: ""
    },
    fields: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    clearOnClose: {
      type: Boolean,
      default: true
    },

    async: {
      type: Boolean,
      default: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    requiredDataEmpty:{
      type: Boolean,
      default: false
    },

    requiredDataEmptyText: {
      type: String,
      default: ''
    },

    maxWidth: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      dialogActive: false,
      formValid: false,
      formFields: {}
    };
  },

  methods: {
    showDialog() {
      this.dialogActive = true;
    },

    closeDialog() {
      this.dialogActive = false;

      if (this.clearOnClose) this.formFields = {};
    },

    confirm() {
      if (this.$refs.form.validate()) {
        this.$emit("confirm", this.formFields);
        
        if(!this.async)
          this.closeDialog();
      }
    }
  },

  created () {
    if (this.fields)
      this.formFields = this.fields
  }
};
</script>