<template>
    <div>
        <the-drawer />
        <the-toolbar />
        <the-view />
        <the-alert />
        <the-loader />
    </div>
</template>

<script>
import TheDrawer from "./TheDrawer";
import TheToolbar from "./TheToolbar";
import TheView from "./TheView";
import TheAlert from "./TheAlert";
import TheLoader from "./TheLoader";

export default {
  components: {
    TheDrawer,
    TheToolbar,
    TheView,
    TheAlert,
    TheLoader
  }
};
</script>
