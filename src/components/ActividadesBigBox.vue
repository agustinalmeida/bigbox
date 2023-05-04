<template>
    <section class="section-container">      
      <div class="container">
        

        <div class="row">
          <div class="col-12">
            <div class="grid-activities">                 
                <router-link :to="'/actividades/' + dato.id" v-for="dato in datos" :key="dato.id">
                  <ItemBox :item="dato"/>          
                </router-link>              
            </div>
          </div>
        </div>
      

        <div class="row">
            <div class="col-12">
              <ul class="pagination">
                <li class="arrow" v-if="links.prev">
                  <a  @click.prevent="goToPage(parseInt(links.prev._page))">&lt;</a>
                </li>
                <li class="pages" v-for="pageNumber in displayedPages" :key="pageNumber">
                  <a @click.prevent="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">{{ pageNumber }}</a>
                </li>
                <li  v-if="displayedPages[displayedPages.length - 1] < totalPages - 1">
                  <span>...</span>
                </li>
                <li class="pages" v-if="displayedPages[displayedPages.length - 1] < totalPages">
                  <a @click.prevent="goToPage(totalPages)">{{ totalPages }}</a>
                </li>
                <li class="arrow" v-if="links.next">
                  <a  @click.prevent="goToPage(parseInt(links.next._page))">&gt;</a>
                </li> 
              </ul>
          </div>  
        </div>      
      </div>
    </section>
</template>

<script>
var parseLinkHeader  = require('parse-link-header');
import axios from 'axios'
import ItemBox from './ItemBox'

export default {
  name: 'ActividadesBigBox',
  components: {  
    ItemBox 
  },
  data() {
    return {
      datos: [],  
      actividades: {},
      currentPage: 1,
      totalPages: null,
      links: {},
      items: [],
      visiblePages: 9
    }
  },
  async  mounted() {
    this.goToPage(1);
  },
  methods: {
    async goToPage(pageNumber) {
        await axios.get(`https://www.frontchallenge.bigbox.com.ar/activity?_page=${pageNumber}&_limit=9`)
      .then(response => {        

        const linkHeader = response.headers.get('Link');
   
        if (linkHeader) {
          this.links = parseLinkHeader(linkHeader);
          this.totalPages = parseInt(this.links.last._page);
        } else {
          this.totalPages = 1;
        }

        this.datos = response.data;
        for(let i=0; i<this.datos.length; i++){          
          this.datos[i].activity = JSON.parse(this.datos[i].activity  );          
        }
       
      })
      .catch(error => {
        console.log(error)
      })

      this.currentPage = pageNumber;
     
    }
  },
  computed: {
  displayedPages() {
    const pages = [];
    const maxPagesToShow = this.visiblePages;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage, endPage;

      if (this.totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = this.totalPages;
      } else {
        if (this.currentPage <= halfMaxPagesToShow) {
          startPage = 1;
          endPage = maxPagesToShow;
        } else if (this.currentPage + halfMaxPagesToShow >= this.totalPages) {
          startPage = this.totalPages - maxPagesToShow + 1;
          endPage = this.totalPages;
        } else {
          startPage = this.currentPage - halfMaxPagesToShow;
          endPage = this.currentPage + halfMaxPagesToShow;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }
  }
}
</script>