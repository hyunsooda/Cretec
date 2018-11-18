<template>
<div>
<div>
    <v-parallax
        dark
        src="src/assets/background.webp"
        :height="'100%'"
    >
        <br><br><br><br>
        <v-container id='container' fluid grid-list-md>
            <v-layout
            align-center
            column
            >
            <h1 class="display-2 font-고eight-thin mb-3">{{title}}</h1>
            <h4 class="subheading">{{subtitle}}</h4>
            </v-layout>

            <br><br><br><br>
        
            <slot></slot>



        </v-container>
    </v-parallax>
    </div>
</div>
</template>

<script>
export default {
    props: ['title', 'subtitle'],
    computed: {
        height() {
            return window.innerHeight; 
        }
    }
}
</script>
<style>
html {   overflow-y: scroll; } 

</style>