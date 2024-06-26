<script setup lang="ts">
import { computed, onBeforeMount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { GetTotalvolfull } from '@/api/top'
const logoBase = import.meta.env.VITE_APP_LOGO_BASE

const route = useRoute()
const router = useRouter()

const item = reactive({
  name: '',
  changed: 0,
  price: 0,
  logo: '',
})

const changedColor = computed(() => (item.changed > 0 ? 'red' : item.changed < 0 ? 'green' : ''))

function getData() {
  GetTotalvolfull({
    limit: 10,
    tsym: 'USD',
  }).then(({ body }) => {
    const found = body.Data.filter(i => 'RAW' in i).find(i => i.CoinInfo.Id === route.params.id)
    if (!found) return router.go(-1)
    item.price = Math.floor(found.RAW.USD.PRICE * 1000) / 1000
    item.changed = Math.floor(found.RAW.USD.CHANGEPCT24HOUR * 100) / 100
    item.name = found.CoinInfo.Name
    item.logo = logoBase + found.CoinInfo.ImageUrl
  })
}

onBeforeMount(() => {
  getData()
})
</script>

<template lang="pug">
#Detail
  header
    img(:src="item.logo")
    .target
      span {{ item.name }}
      small 選擇交易對
    .current
      span {{ item.price }}
      small 最新成交價格
    .changed
      span(:class="changedColor") {{ item.changed }}
      small 24小時
    i(v-for="i in 3" :key="i")
  .chart
    span
  footer
    span(v-for="i in 5" :key="i")
</template>
<style lang="sass" scoped>
#Detail
  > header
    background: #10141f
    position: sticky
    top: 0
    display: grid
    grid-template-columns: 2fr 6fr 4fr 4fr repeat(3, 20px)
    font-size: 12px
    height: 50px
    align-items: center
    justify-items: center
    gap: 8px
    padding: 0 10px
    z-index: 1
    > img
      width: 100%
      height: 25px
      object-fit: contain
    > div
      display: grid
      color: white
      white-space: nowrap
      width: 100%
      overflow: hidden
      line-height: 1
      box-sizing: border-box
      &.target
        > span
          justify-self: start
          position: relative
          padding-right: 10px
          &::before
            $size: 3px
            position: absolute
            right: 0
            top: 50%
            transform: translateY(-50%)
            content: ''
            content: ''
            width: 0
            height: 0
            border-left: $size solid transparent
            border-right: $size solid transparent
            border-top: $size solid #fff
          &::after
            content: '/USD'
      &.current
        > span::after
          content: 'USD'
          display: block
      &.changed
        > span
          &.red::before
            content: '+'
          &::after
            content: '%'
      > small
        color: #666
        font-size: 12px
        padding-top: 5px
        transform: scale(0.7)
        transform-origin: left top

      > span
    > i
      width: 20px
      height: 20px
      display: block
      border-radius: 50%
      box-shadow: inset 0 0 0 2px #eee
  > .chart
    padding: 0 10px
    position: relative
    display: grid
    grid-template: 'a'
    overflow: hidden
    &::before
      content: ''
      grid-area: a
      display: block
      height: 100vh
      background: #000
    &::after
      content: ''
      height: 100vh
      grid-area: a
      background-image: linear-gradient(to top,#fff3 0,#fff3 1px,transparent 1px,transparent 100px)
      background-size: 1px 100px
    > span
      grid-area: a
      height: 100vh
      overflow: hidden
      &::before
        content: ''
        display: block
        height: 200vh
        width: 400%
        transform: rotate(45deg)
        border: 1px solid yellow
        transform-origin: 10vh 100vw
  > footer
    z-index: 1
    background: #23344e
    position: sticky
    bottom: 0
    display: grid
    grid-auto-flow: column
    grid-template-columns: repeat(5, 1fr)
    padding: 10px 0 5px
    box-sizing: border-box
    > span
      display: grid
      justify-items: center
      gap: 3px
      &::before
        content: ''
        width: 20px
        height: 20px
        border-radius: 50%
        box-shadow: inset 0 0 0 2px #eee
      &::after
        content: 'text'
</style>
