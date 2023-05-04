<template>
    <section class="section-container actividad-detalle" >   
      <div class="container" ref="actividad">
        <div class="row">
          <div class="col-12 content-back">
            <router-link :to="'/actividades/' " >              
              <img src="@/assets/icon-arrow.svg" alt="Back">
            </router-link>
          </div>
          <div class="col-md-6">
            <div class="wrapper-carousel">
              <carousel :items-to-show="1" :wrapAround="true">
                <slide v-for="(item, index) in this.activity.image" :key="item.id">          
                  <img :src="this.activity.image[index]"/>
                </slide>
                <template #addons>
                  <navigation />
                  <pagination />
                </template>
              </carousel>
            </div>
          </div>
          <div class="col-md-6">
            <div class="wrapper-info">
            <h1>{{ data.title }}</h1>
            <p>{{ activity.description }}</p>
            <div class="participants">
                <div class="icons">
                  <img :src="iconPeople" v-for="indice in activity.participants" :key="indice"/>
                </div> 
                <span>Para {{ activity.participants }} personas</span>
            </div>
            <div class="locations"> 
              <div><img class="icon" src="@/assets/icon-location.svg" alt="Botón"> <span v-text="location"></span></div>
            </div>
            
            <span class="puntos">{{ data.points }} puntos</span>
            
            </div>
          </div>
        </div>
        <div class="row que-incluye">
          <div class="col-md-6">
            <div class="content-title">
              <h3>¿Qué incluye?</h3>
            </div>
            
            <div class="benefits" v-html="activity.benefits"></div>
            
            <div class="content-reglas">
              <h4><img :src="iconReglas"/> Reglas</h4>
              <div v-html="activity.small_print"></div>
            </div>
            
            
          </div>
        </div>
      </div>      
    </section>
    
    <ActividadesRelacionadas :activity_type="activity_type"/>
</template>
<style lang="scss" >
@import "../scss/components/_actividad-detalle.scss";
</style>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import axios from 'axios'
import iconSvg from '@/assets/icon-people.svg'
import iconReglasSvg from '@/assets/icon-reglas.svg'
import iconArrowSvg from '@/assets/icon-arrow.svg'
import ActividadesRelacionadas from './ActividadesRelacionadas'

// optional style for arrows & dots
export default {
  name: 'ActividadDetalle',
  components: {  
    Carousel,
    Slide,
    Pagination,
    Navigation,
    ActividadesRelacionadas
  },
  data() {
    return {
        data: [],
        activity: [],
        slickOptions: {
        slidesToShow: 3,
        arrows: false,
        iconPeople: '',
        iconReglas: '',
        iconArrow: '',
        activity_type: '',
        location: String
      }
    }
  },
  props:{
    
  },
  mounted: function() {
   //
    this.iconPeople = iconSvg;
    this.iconReglas = iconReglasSvg;
    this.iconArrow = iconArrowSvg;
    this.getActivity(this.$route.params.id);
    
  },
  methods: {
      getActivity(idActivity){
        const actividad_id = idActivity;
        axios.get('https://www.frontchallenge.bigbox.com.ar/activity/'+actividad_id)
          .then(response => {
            
            this.data = response.data;
            this.activity_type  = this.data.activity_type;        
            this.showActivity(this.data.activity)
            
          })
          .catch(error => {
            console.log(error)
          })
      },
      showActivity(data){
        this.activity = JSON.parse(data);
        this.location = this.activity.locations[0].province;   
             
        window.scrollTo(
          {
            top: 10,
            behavior: 'smooth'
          }
        );
        
        
      },
      onInitCarousel() {
        
      }
    },
    watch: {
      '$route.params.id'(newVal) {
        this.getActivity(newVal);
        
      }
    }
}
</script>