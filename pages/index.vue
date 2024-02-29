<script lang="ts" setup>
import { useArticleStore } from '~/store/ArticleStore'
import type {IArticle} from "~/api/article/types";

const online = useOnline()

useSeoMeta({
  ogImage: '/og.png',
  twitterTitle: '魚的小屋',
  twitterDescription: '魚的小屋 is A Web Developer 🖥. Code for Fun.',
  twitterImage: '/og.png',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
})

const articles: Ref<IArticle[]> = ref([])
const shorts: Ref<IArticle[]> = ref([])
const projects: Ref<IArticle[]> = ref([])

const { getAll } = useArticleStore()

await getAll().then((data) => {
  data.forEach((project) => {
    articles.value.push(project)
  })
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div>
        <Suspense>
          <ClientOnly>
            <div v-if="!online" text-gray:80>
              You're offline
            </div>
          </ClientOnly>
          <template #fallback>
            <div op50 italic>
              <span animate-pulse>Loading...</span>
            </div>
          </template>
        </Suspense>
        <WelcomeCard />
        <NuxtLayout name="home">
          <div v-if="articles.length > 0" id="featured">
            <div class="title-font">
              文章列表
            </div>
            <BlogCards :articles="articles" />
            <div class="title-btn">
              <MyButton @click="$router.push('/blog')">
                See More
                <div class="i-ri:arrow-right-line ml-2 mt-[2px] text-violet" />
              </MyButton>
            </div>
          </div>
        </NuxtLayout>
      </div>
    </NuxtLayout>
  </div>
</template>
