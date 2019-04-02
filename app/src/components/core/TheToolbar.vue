<template>
  <v-toolbar
    color="teal darken-4"
    app
    fixed
    clipped
    dark
  >
    <v-toolbar-side-icon @click.stop="onClickMenuBtn"></v-toolbar-side-icon>
    <v-btn icon v-if="toolbarBackUrl" @click="redirectBack()">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu
      :close-on-content-click="true"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on }">       
        <v-btn
          v-on="on"
          icon
          class="text-right"
        >
          <v-icon>account_circle</v-icon>
        </v-btn>
      </template>
    </v-menu>

  </v-toolbar>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      title: ""
    };
  },

  computed: {
    ...mapState(["toolbarBackUrl"]),
    ...mapGetters(['GET_USER']),

    backUrl () {
      return this.$store.state.toolbarBackUrl
    },

    getUserFirstLetter() {
      return this.GET_USER.nome.substring(0,1).toUpperCase()
    }
  },

  watch: {
    $route(val) {
      this.title = val.meta.title ? val.meta.title : '';
    }
  },

  methods: {
    ...mapMutations(["SET_DRAWER", "TOGGLE_DRAWER"]),

    onClickMenuBtn() {
      this.TOGGLE_DRAWER();
    },

    redirectBack(){
      this.$router.push({ path: this.toolbarBackUrl });
    },

  },

  mounted () {
    
  }
};
</script>