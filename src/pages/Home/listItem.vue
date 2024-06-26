<script setup lang="ts">
import type { GetTotalvolfull } from '@/api/top'
import type { RespData } from '@/utils/request'
import priceToString from '@/utils/priceString'
import { computed } from 'vue'

const logoBase = import.meta.env.VITE_APP_LOGO_BASE
const TWDExchange = 32.045

const props = defineProps<{ item: RespData<typeof GetTotalvolfull>['Data'][number] }>()
const itemRender = computed(() => {
  const i = props.item
  const changed = Math.floor(i.RAW.USD.CHANGEPCT24HOUR * 100) / 100
  const { vol, unit } = volToString(i.RAW.USD.VOLUME24HOUR)
  return Object.assign(
    {
      logo: logoBase + i.CoinInfo.ImageUrl,
      price: priceToString(i.RAW.USD.PRICE),
      price_tw: priceToString(i.RAW.USD.PRICE * TWDExchange),
      changed,
      changedColor: changed > 0 ? 'red' : changed < 0 ? 'green' : '',
      vol,
      volUnit: unit,
    },
    props.item,
  )
})

function volToString(val: number) {
  if (val >= 100000000000) {
    return { vol: Math.floor((val / 1000000000000) * 100) / 100, unit: 'T' }
  } else if (val >= 100000000) {
    return { vol: Math.floor((val / 1000000000) * 100) / 100, unit: 'B' }
  } else if (val >= 10000) {
    return { vol: Math.floor((val / 1000000) * 100) / 100, unit: 'M' }
  }
  return { vol: Math.floor(val), unit: '' }
}
</script>

<template lang="pug">
router-link.list-item(:to="{name:'detail',params: {id:itemRender.CoinInfo.Id}}")
  img(:src="itemRender.logo")
  .currency
    span {{ itemRender.CoinInfo.Name }}
    small(:data-unit="itemRender.volUnit") {{ itemRender.vol }}
  .value 
    span {{ itemRender.price }}
    small {{ itemRender.price_tw }}
  .change(:class="itemRender.changedColor") {{ itemRender.changed }}
</template>

<style lang="sass" scoped>
.list-item
  min-width: 280px
  width: 100%
  display: grid
  grid-template-columns: 25px 2fr 3fr 1fr
  color: #fff
  text-decoration: none
  aspect-ratio: 5 / 1
  font-size: 12px
  align-items: center
  gap: 0 10px
  padding: 0 10px
  box-sizing: border-box
  &:active
    background: #fff1
  &:not(:last-child)
    border-bottom: 1px solid #333
  > img
    width: 100%
    height: 100%
    object-fit: contain
  > .currency
    display: grid
    > small
      &::before
        content: 'Vol'
        margin-right: 5px
      &::after
        content: attr(data-unit)
        margin-left: 5px
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
    &.red::before
      content: '+'
    &::after
      content: '%'
  small
    color: #aaa
    font-size: 12px
  span,small
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
</style>
