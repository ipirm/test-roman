<template>
  <div class="row" v-if="course">
    <div class="col-12">
      <form style="margin-top: 100px" @submit.prevent="checkForm">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            type="button" class="btn"
            :class="['btn', item.to === $route.query.type ? 'btn-primary' : 'btn-secondary']"
            v-for="item in loginTabs" @click="changeTabs(item)">
            {{item.text}}
          </button>
          <button type="button" class="btn btn-secondary" @click="deleteCourse(course.id)">Delete</button>
        </div>
        <div v-for="item in error" class="text-danger">
          {{ item}}
        </div>
        <div class="form-group row mt-5">
          <label class="col-sm-2 col-form-label">Title</label>
          <div class="col-sm-10">
            <input type="text" :readonly="edit" class="form-control" v-model.trim="course.title">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <input type="text" :readonly="edit" class="form-control" v-model="course.description">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-10">
            <input type="text" :readonly="edit" class="form-control" v-model="course.price">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Start Date</label>
          <div class="col-sm-10">
            <input type="text" :readonly="edit" class="form-control" v-model="course.startDate">
          </div>
        </div>
        <button type="submit" class="btn btn-primary" @click="$router.push({name: 'courses'})"> Back</button>
        <button type="submit" class="btn btn-success" v-if="!edit"> Save</button>
      </form>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "",
        data() {
            return {
                edit: true,
                error: [],
                loginTabs: [
                    {
                        id: 1,
                        text: 'View',
                        to: 'view'
                    },
                    {
                        id: 2,
                        text: 'Edit',
                        to: 'edit'
                    }
                ]
            }
        },
        created() {
            this.getCourse(this.$route.params.id)
        },
        methods: {
            ...mapActions('course', ['getCourse', 'deleteCourses', 'updateCourse']),
            checkForm() {
                this.error = []
                for (let [key, value] of Object.entries(this.course)) {
                    if (!value.length && key !== 'id')
                        this.error.push(`The input ${key} cannot be empty`)
                }

                if(!this.error.length) {
                    this.updateCourse(this.course)
                    this.$router.push({name: 'courses'})
                }
            },
            deleteCourse(id) {
                this.deleteCourses(id)
                this.$router.push({name: 'courses'})
            },
            changeTabs(item) {
                if (item.to !== this.$route.query.type) {
                    this.$router.push({query: {type: item.to}})
                    this.edit = !this.edit
                }
            }
        },
        computed: {
            ...mapState('course', ['course']),
        }
    }
</script>

<style scoped>

</style>
