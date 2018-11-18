<template>
  <v-container>
    <v-layout row wrap>
    </v-layout>
    <v-layout row wrap class="mt-2" >
      <v-flex xs12 sm12 >
        <v-carousel style='height:750px; width:50%; osition:absolute;left:25%;'>
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            >
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>KyungPook National University Hyun-soo Shin</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        meetups: [
          { imageUrl: 'src/assets/ppp.png', id: 'afajfjadfaadfa323', title: 'About Developer' },
          { imageUrl: 'src/assets/dke.png', id: 'aadsfhbkhlk1241', title: 'LABS. DKE at KNU in Republic Of Korea' }
        ]
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>