<script setup lang="ts">
import { GetTotalvolfull } from '@/api/top'
import { onMounted, reactive } from 'vue'
import type { ReqData } from '@/utils/request'

const postData = reactive<ReqData<typeof GetTotalvolfull>>({
  limit: 20,
  tsym: 'USD',
})
function getList() {
  GetTotalvolfull(postData)
}

onMounted(() => {
  getList()
})
</script>

<template lang="pug">
main
</template>

<style lang="sass" scoped>
main
  width: 100%
</style>
