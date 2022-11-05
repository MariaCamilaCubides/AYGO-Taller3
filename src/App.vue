<template>
  <div id="app">
    <GalleryCarousel/>
  </div>
</template>

<script>
import GalleryCarousel from './views/GalleryCarousel.vue'

export default {
  name: 'App',
  components: {
    GalleryCarousel
  }
}
</script>

<style lang="scss">
::selection {
  background-color: #632d8e;
  color: #fff;
}
.title-dropdown {
  color: #000;
}
.card {
  border-radius: 3px !important;
  margin-top: 100px !important;
  margin-bottom: 5px !important;
  max-width: 800px;
}
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
// Set your colors
$primary: #632d8e;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);
$secondary: #38303d;
$secondary-light: findLightColor($secondary);
$secondary-dark: findDarkColor($secondary);
$secondary-invert: findColorInvert($secondary);
// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
    (
        "white": (
            $white,
            $black,
        ),
        "black": (
            $black,
            $white,
        ),
        "light": (
            $light,
            $light-invert,
        ),
        "dark": (
            $dark,
            $dark-invert,
        ),
        "primary": (
            $primary,
            $primary-invert,
            $primary-light,
            $primary-dark,
        ),
        "secondary": (
            $secondary,
            $secondary-invert,
            $secondary-light,
            $secondary-dark,
        ),
        "link": (
            $link,
            $link-invert,
            $link-light,
            $link-dark,
        ),
        "info": (
            $info,
            $info-invert,
            $info-light,
            $info-dark,
        ),
        "success": (
            $success,
            $success-invert,
            $success-light,
            $success-dark,
        ),
        "warning": (
            $warning,
            $warning-invert,
            $warning-light,
            $warning-dark,
        ),
        "danger": (
            $danger,
            $danger-invert,
            $danger-light,
            $danger-dark,
        ),
    ),
    $custom-colors
);
// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

// Card
.material-card-content{
  padding: 16px;
}
.material-card {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}
.material-card-overflow {
  border-radius: 6px;
  overflow: inherit;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}
.main-card-form-button {
  width: 100%;
}
.padding-card-footer {
  padding: 10px;
}
.card-form-container {
  margin-top: 20px !important;
  margin-bottom: 5px !important;
  max-width: 500px;
}
.card-middle-container {
  margin-top: 20px !important;
  margin-bottom: 5px !important;
  max-width: 800px;
}
.card-container {
  margin-top: 20px !important;
  margin-bottom: 5px !important;
  max-width: 1200px;
}

// Other
.force-right {
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  margin-left: auto;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
</style>