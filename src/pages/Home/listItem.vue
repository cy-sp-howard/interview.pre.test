<script setup lang="ts">
import type { GetTotalvolfull } from '@/api/top'
import type { RespData } from '@/utils/request'
import { computed } from 'vue'
const logoBase = import.meta.env.VITE_APP_LOGO_BASE
const TWDExchange = 32.045

const props = defineProps<{ item: RespData<typeof GetTotalvolfull>['Data'][number] }>()
const itemRender = computed(() => {
  const i = props.item
  const changed = Math.floor(i.RAW.USD.CHANGEPCT24HOUR * 100) / 100
  return Object.assign(
    {
      logo: logoBase + i.CoinInfo.ImageUrl,
      price: priceToString(i.RAW.USD.PRICE),
      price_tw: priceToString(i.RAW.USD.PRICE * TWDExchange),
      changed,
      changedColor: changed > 0 ? 'red' : changed < 0 ? 'green' : '',
      vol: i.RAW.USD.VOLUME24HOUR.toLocaleString(),
    },
    props.item,
  )
})

function priceToString(val: number) {
  let maximumFractionDigits = 3
  if (val < 0.1) {
    maximumFractionDigits = Math.floor(1 / val).toString().length + 2
    if (maximumFractionDigits > 7) maximumFractionDigits = 7
  } else if (val > 10000) {
    maximumFractionDigits = 0
  }
  const floorDec = Math.pow(10, maximumFractionDigits)
  return (Math.floor(val * floorDec) / floorDec).toLocaleString('en', { maximumFractionDigits })
}
</script>

<template lang="pug">
router-link.list-item(:to="{name:'detail',state: itemRender}")
  img(:src="itemRender.logo")
  .currency
    span {{ itemRender.CoinInfo.Name }}
    small {{ itemRender.vol }}
  .value 
    span {{ itemRender.price }}
    small {{ itemRender.price_tw }}
  .change(:class="itemRender.changedColor") {{ itemRender.changed }}
</template>

<style lang="sass" scoped>
.list-item
  min-width: 300px
  max-width: 600px
  display: grid
  grid-template-columns: 40px 2fr 3fr 1fr
  color: #fff
  text-decoration: none
  aspect-ratio: 5 / 1
  font-size: 14px
  align-items: center
  gap: 0 20px
  padding: 0 10px
  &:not(:last-child)
    border-bottom: 1px solid #333
  > img
    width: 100%
    height: 100%
    object-fit: contain
  > .currency
    display: grid
    > small:before
      content: 'Vol'
      margin-right: 5px
  > .value
    display: grid
    text-align: right
    > span
      &::after
        margin-left: 10px
        content: 'USD'
    > small
      &::before
        content: '≈'
      &::after
        content: 'TWD'
        margin-left: 10px
  > .change
    text-align: right
    &::after
      content: '%'
  small
    color: #aaa
    font-size: 14px
  span,small
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

.red
  color: red
.green
  color: DarkSeaGreen
</style>
