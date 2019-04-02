<template>
  <v-content style="background-color:#e8e9ed">
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>

export default {
  metaInfo() {
    return {
      title: ""
    };
  }
};
</script>