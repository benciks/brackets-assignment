<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { type Response } from '../types/Response'
import { type Character } from '../types/Character'

const entries = ref<Character[]>([])
const search = ref('')
const page = ref(1)
const count = ref(0)

const fetchData = async () => {
  try {
    const res = await fetch(
      `https://swapi.py4e.com/api/people?search=${search.value}&page=${page.value}`
    )
    const fetchedData: Response = await res.json()
    entries.value = fetchedData.results
    count.value = fetchedData.count
  } catch (error) {
    console.log(error)
  }
}

const getCharacterId = (url: string) => {
  const urlParts = url.split('/').filter(Boolean)
  return urlParts[urlParts.length - 1]
}

onMounted(async () => {
  await fetchData()
})

watch([search, page], async () => {
  await fetchData()
})
</script>

<template>
  <main class="max-w-xl mx-auto flex flex-col gap-4 py-10">
    <div class="flex justify-between items-center w-full">
      <h1 class="text-2xl font-bold">AllianceBook</h1>
      <input
        v-model="search"
        placeholder="Search"
        class="px-4 py-2 border border-gray-100 rounded-xl"
      />
    </div>
    <div
      v-for="(entry, index) in entries"
      :key="page + index"
      class="p-4 bg-gray-100 rounded-xl flex gap-4 items-center"
    >
      <img
        :src="
          'https://starwars-visualguide.com/assets/img/characters/' +
          getCharacterId(entry.url) +
          '.jpg'
        "
        :alt="entry.name"
        class="w-14 h-14 rounded-full overflow-hidden object-cover"
      />
      <div>
        {{ entry.name }}
      </div>
    </div>
    <div class="flex gap-2 justify-between w-full">
      <button
        @click="page > 1 ? page-- : null"
        class="bg-gray-100 font-semibold px-4 py-1 rounded-xl"
      >
        Prev
      </button>
      <div class="flex gap-2">
        <div
          v-for="item in Array(Math.round(count / 10)).keys()"
          :key="item"
          @click="page = item + 1"
          class="px-2 py-1 border border-gray-100 rounded-xl cursor-pointer"
          :class="page === item + 1 ? 'bg-gray-100' : ''"
        >
          {{ item + 1 }}
        </div>
      </div>
      <button
        @click="page < Math.round(count / 10) ? page++ : null"
        class="bg-blue-500 text-white font-semibold px-4 py-1 rounded-xl"
      >
        Next
      </button>
    </div>
  </main>
</template>
