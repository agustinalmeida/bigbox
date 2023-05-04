<template>
    <div class="item-box">
        <picture>
            <img :src="item.activity.image[0]"/>
        </picture>
        <div class="head">
            <h3>{{ item.activity.title }}</h3>
            <div class="participants">
                <div v-for="indice in item.activity.participants" :key="indice"><img :src="iconPeople" alt="icon People" /></div>
            </div>
            
        </div>
       
       <div class="locations"> 
            <img class="icon" src="@/assets/icon-location.svg" alt="Location">{{ item.activity.locations[0].province }}
       </div>
       <p>
        {{ item.activity.description }}
       </p>

       <span class="points">{{ item.points }} puntos</span>
    </div>
</template>
<style lang="scss" >
@import "../scss/components/_ItemBox.scss";
</style>
<script>
    export default {
        data() {    
            return {
                iconPeople: require('@/assets/icon-people.svg') 
            }
        },
        props:{
			item:{
				type: Object
            }
        },
        mounted: function() {
			//console.log(this.item);
		}
        
    }
</script>