<template>
    <section class="actividades-relacionadas">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h4>Otras actividades similares:</h4>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <carousel v-bind="settings" :breakpoints="breakpoints">
                        <slide v-for="relacion in relaciones" :key="relacion">          
                            <router-link :to="'../actividades/' + relacion.id" class="no-decoration">
                                <ItemBox :item="relacion"/>         
                            </router-link>
                        </slide>
                        <template #addons>
                        <navigation />
                     
                        </template>
                    </carousel>
                </div>                
                
            </div>
        </div>        
    </section>
</template>
<style lang="scss" >
@import "../scss/components/_actividades-relacionadas.scss";
</style>
<script>
    import axios from 'axios'
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Navigation } from 'vue3-carousel'
    import ItemBox from './ItemBox'
    export default {
        name: 'ActividadesRelacionadas',
        components: {  
            Carousel,
            Slide,
            Navigation,
            ItemBox
        },
        data() {
            return {
                relaciones: null,
                settings: {
                    itemsToShow: 1,
                    snapAlign: 'start',
                    itemsToScroll: 1,
                    transition: 700,
                    autoplay: 3000,
                    wrapAround: true                    
                },
                breakpoints: {
                    992: {
                        itemsToShow: 4
                    },
                    640: {
                        itemsToShow: 2
                    }
                }                
            }
        },
        props:{
            activity_type:{
                type:String,
                required: true,
                default: null
            }
        },
        created () {            
            
        },
        watch: {           
            activity_type() {
                this.getRelaciones()
            }
        },
        methods:{
            getRelaciones() {                
                axios.get(`https://www.frontchallenge.bigbox.com.ar/activity?activity_type=${this.activity_type}&_limit=16`)
                .then(response => {                                        
                    this.relaciones = response.data;     
                    for(let i=0; i<this.relaciones.length; i++){          
                        this.relaciones[i].activity = JSON.parse(this.relaciones[i].activity  );          
                    }                                     
                })
                .catch(error => {
                    console.log(error)
                })                
            }
        }
    }
</script>