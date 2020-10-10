<template>
  <div class="live">

  </div>
</template>

<script>
import swipe from '../../components/common/swipe'
export default {
  components: {
   
  },
    data() {

        return {
            list:[
                 {
          transform: 'translateX(0) scale(0.95)', //1
          // transform:'scale(0.95)',
          transformOrigin: '0% 100%',
          zIndex: '1'
        },
         {
          transform: 'translateX(111px)', //2
          zIndex: '2'
        },
         {
          transform: 'translateX(540px) scale(0.95)',//3
          // transform:'scale(0.95)',
          transformOrigin: '100% 100%',
          zIndex: '1'
        },
         {
          transform: 'translateX(651px) scale(0.95)',//4
          // transform:'scale(0.95)',
          transformOrigin: '100% 100%',
          zIndex: '1'
        },
         {
          transform: 'translateX(760px)  scale(0.95)',//5
          // transform:'scale(0.95)',
          transformOrigin: '100% 100%',
          zIndex: '1'
        },
         {
          transform: 'translateX(870px)  scale(0.95)',//6
          // transform:'scale(0.95)',
          transformOrigin: '100% 100%',
          zIndex: '1'
        },
         {
          transform: 'translateX(980px)  scale(0.95)',//7
          // transform:'scale(0.95)',
          transformOrigin: '100% 100%',
          zIndex: '1'
        },
         {
          transform: 'translateX(1090px)  scale(0.95)',//8
          // transform:'scale(0.95)',
          transformOrigin: '100% 100%',
          zIndex: '1'
        },
         {
          transform: 'translateX(1200px)  scale(0.95)',//9
          // transform:'scale(0.95)',
          transformOrigin: '100% 100%',
          zIndex: '1'
        },
         {
          transform: 'translateX(1310px)  scale(0.95)',//10
          // transform:'scale(0.95)',
          transformOrigin: '100% 100%',
          zIndex: '1'
        },
        
            ]
        }
    },
    components: {
        LHeadArea,
    },
}
</script>

<style lang="less" scoped>

</style>