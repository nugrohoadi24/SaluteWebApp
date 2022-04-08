<template>
    <div class="page-section">
        <div class="container space-bottom">
            <div class="mt-2 d-block">
                <div class="card card-list text-color-blue my-3" v-for="item in items" :key="item._id">
                    <div class="card-body">
                        <div class="account-list">
                            <h3 class="text-description">
                                {{ isDate(item.created_at) }}
                            </h3>
                            <h2 class="text-description font-weight-bolder text-uppercase">
                                {{ item.description }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
export default {
  props: {
    items:Array
  },
  methods: {
    isDate(date) {
      return moment(date).format('DD MMM YYYY');
    }
  }
}
</script>

<style>

</style>