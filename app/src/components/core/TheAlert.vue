<template>
  <v-snackbar
    v-model="alert.value"
    :color="alert.type"
    :multi-line="true"
    :timeout="alert.timeout"
  >
    {{ alert.message }}
    <v-btn
      dark
      flat
      @click="CLOSE_ALERT"
    >
      Fechar
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["alert"])
  },

  methods: {
    ...mapMutations(["CLOSE_ALERT"])
  }
};
</script>
