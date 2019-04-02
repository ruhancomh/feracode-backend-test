<template>
    <v-dialog
      v-model="loader.value"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{ loaderText }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
        text: 'Por favor aguarde'
    };
  },
  computed: {
    ...mapState(["loader"]),

    loaderText () {
        return this.loader.text ? this.loader.text : this.text
    }
  },

};
</script>
