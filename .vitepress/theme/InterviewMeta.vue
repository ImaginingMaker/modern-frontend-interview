<script setup lang="ts">
defineProps<{
  difficulty: number
  frequency: '低' | '中' | '高' | '极高'
  levels: string
  verified?: string
}>()
</script>

<template>
  <div class="interview-meta" role="note" aria-label="面试题元信息">
    <span><strong>难度</strong> <span class="stars" :aria-label="`${difficulty} 星难度`">{{ '★'.repeat(difficulty) }}{{ '☆'.repeat(5 - difficulty) }}</span></span>
    <span><strong>频率</strong> {{ frequency }}</span>
    <span><strong>岗位</strong> {{ levels }}</span>
    <span v-if="verified"><strong>核验</strong> {{ verified }}</span>
  </div>
</template>
