<template>
  <div class="row">
    <div class="col-12 text-center mt-5">
      <h2>Количество курсов в списке: {{ this.courses.length }}</h2>
    </div>
    <table class="table table-striped mt-5">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Название</th>
        <th scope="col">Описание</th>
        <th scope="col">Цена</th>
        <th scope="col">Начало</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in coursesPaginate"
        :key="item.id"
        @click="$router.push({name:'courses-id', params:{id: item.id},query: {type: 'view'}})">
        <th>{{item.id}}</th>
        <td>{{ item.title}}</td>
        <td>{{ item.description}}</td>
        <td>{{ item.price}}</td>
        <td>{{ item.startDate}}</td>
      </tr>
      </tbody>
    </table>
    <Pagination
      :items="courses"
      :perPage="4"
      :page="page"
      @pageChanged="pageIsChanged"
    />
  </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Pagination from "~/components/elements/Pagination";

    export default {
        components: {
            Pagination,
        },
        created() {
            this.getCourses();
            if (this.$route.query.page)
                this.page = this.$route.query.page
        },
        data() {
            return {
                page: 0,
                perPage: 4
            }
        },
        methods: {
            ...mapActions('course', ['getCourses']),
            pageIsChanged(item) {
                this.page = item;
                this.$router.push({query: {page: item + 1}});
            }
        },
        computed: {
            ...mapState('course', ['courses']),
            coursesPaginate() {
                const start = this.page * this.perPage,
                    end = start + this.perPage;
                return this.courses.slice(start, end);
            },
        }
    }
</script>

