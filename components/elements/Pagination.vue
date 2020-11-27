<template>
  <nav aria-label="Page navigation text-center">
    <ul class="pagination">
      <button class="page-item" :disabled="page===0" @click.prevent="prevPage">Prev</button>
      <li class="page-item" v-for="index in pageCount">
        <a class="page-link" href="#" @click.prevent="changePage(index-1)">{{ index}}</a>
      </li>
      <button class="page-item" :disabled="page+1 >= this.pageCount" @click.prevent="nextPage">Next</button>
    </ul>
  </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            items: {
                type: Array,
                required: true
            },
            perPage: {
                type: Number,
                required: false,
                default: 10
            },
            page: {
                type: Number,
                required: false,
                default: 0
            }
        },
        methods: {
            prevPage() {
                this.$emit('pageChanged', this.page !== 0 ? --this.page : '');
            },
            nextPage() {
                this.$emit('pageChanged', this.page+1 >= this.pageCount ? ++this.page : '');
            },
            changePage(index) {
                this.$emit('pageChanged', index);
            },
        },
        computed: {
            pageCount() {
                let l = this.items.length,
                    s = this.perPage;
                return Math.ceil(l / s);
            }
        }
    }
</script>

<style scoped>

</style>
