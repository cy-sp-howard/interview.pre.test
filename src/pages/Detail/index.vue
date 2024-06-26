<script setup lang="ts"></script>

<template lang="pug">
#Detail
  header
    img()
    div
      span das
      small ad
    div
      span asd
      small asd
    small asd
    i(v-for="i in 3" :key="i")
  .chart
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
    grid-template-columns: 20px 1fr 1fr 40px repeat(3,30px)
    font-size: 14px
    height: 50px
    align-items: center
    justify-items: center
    gap: 10px
    small
      color: #333
      font-size: 14px
    span
      color: white
    > div
      display: grid
    > i
      width: 20px
      height: 20px
      display: block
      border-radius: 50%
      box-shadow: 0 0 0 2px #eee
  > .chart
    min-height: 100vh
    background: #000
  > footer
    background: #23344e
    position: sticky
    bottom: 0
    display: grid
    grid-auto-flow: column
    grid-template-columns: repeat(5, 1fr)
    padding: 20px 0 10px
    > span
      display: grid
      justify-items: center
      &::before
        content: ''
        width: 20px
        height: 20px
        border-radius: 50%
        box-shadow: 0 0 0 2px #eee
      &::after
        content: 'text'
</style>
