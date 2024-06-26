<script setup lang="ts">
import { GetTotalvolfull } from '@/api/top'
import { onMounted, reactive, ref } from 'vue'
import type { ReqData, RespData } from '@/utils/request'
import ListItem from './listItem.vue'

const postData = reactive<ReqData<typeof GetTotalvolfull>>({
  limit: 10,
  tsym: 'USD',
})
const list = ref<RespData<typeof GetTotalvolfull>['Data']>([])

function getList() {
  GetTotalvolfull(postData).then(({ body }) => {
    list.value = body.Data.filter(i => 'RAW' in i)
  })
}

onMounted(() => {
  getList()
})
</script>

<template lang="pug">
#home
  list-item(v-for="(i,index) in list" :key="index" :item="i")
</template>

<style lang="sass" scoped>
#home
  background: #0a0f14
  margin: 20px
  &:empty
    height: 50vh
    display: grid
    align-items: center
    justify-content: center
    &::before
      content: ''
      width: 50px
      height: 50px
      border-radius: 50%
      border: 3px solid #fff
      animation: whirl 1s linear infinite

@keyframes whirl
  100%
    transform: rotate3d(0,1,0,360deg)
</style>
