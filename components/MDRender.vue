<script setup lang="ts">
import { useClipboard, useMouse, useTextSelection } from '@vueuse/core'
import mdcPlugin from 'markdown-it-mdc'

import shikiji from '@shikijs/markdown-it';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import anchor from 'markdown-it-anchor';

// @ts-expect-error miss type
import video from '@vrcd-community/markdown-it-video';
import container from 'markdown-it-container';

// @ts-expect-error miss type
import { full as emoji } from 'markdown-it-emoji';

// @ts-expect-error miss type
import lazy_loading from 'markdown-it-image-lazy-loading';

// @ts-expect-error miss type
import todo from 'markdown-it-task-lists';

// @ts-expect-error miss type
import codeCopy from 'markdown-it-code-copy';

import Card from '~/components/content/Card.vue'

import '~/styles/markdown.css'
import '~/styles/prose.css'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const computedSource = computed(() => props.source.replace(/\\n/g, '\n'))

const emit = defineEmits(['renderFinished'])

emit('renderFinished')

const openPop = ref<boolean>(false)

const { x, y } = useMouse({ touch: false })

function checkSelection() {
  const selection = window.getSelection()
  if (selection && selection.toString()) {
    // 文字被选中
    openPop.value = true
    const pop = document.querySelector('.popover') as HTMLElement
    if (pop) {
      pop.style.left = `${x.value - 20}px`
      pop.style.top = `${y.value - 100}px`
    }
  }
  else {
    // 没有文字被选中
    openPop.value = false
  }
}

const toast = useToast()
const state = useTextSelection()

const source = ref(state.text.value)

watch(() => state.text.value, (val) => {
  if (val !== '')
    source.value = val
})

const { copy, isSupported } = useClipboard({ source })

function copySelection() {
  copy()
  toast.add({ title: 'Copied', description: source.value, timeout: 3000, icon: 'i-heroicons-check-circle text-violet' })
  openPop.value = false
}

onMounted(() => {
  document.querySelectorAll('.markdown-it-code-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      toast.add({ title: 'Copied', timeout: 1000, icon: 'i-heroicons-check-circle text-violet' })
    })
  })
})

const { rendered: NuxtMarkdown, md } = useNuxtMarkdown(computedSource, {
  components: {
    Card,
  },
  plugins: [
    mdcPlugin,
    anchor,
    await shikiji({
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerMetaHighlight(),
      ],
    })
  ],
})

md.value.use(container);

md.value.use(video);

md.value.use(emoji);

md.value.use(lazy_loading);

md.value.use(todo);

md.value.use(codeCopy, {
  iconClass:
    'i-carbon-copy w-30px h-30px text-violet opacity-50 hover:opacity-100 transition-all',
  iconStyle:
    'font-size: 1.5em;width: 20px;height: 20px;background-size: cover;display: inline-block;',
});

</script>

<template>
  <div id="violetMD" class="violet-prose mb-20 mt-5 text-left" @mouseup="checkSelection">
    <NuxtMarkdown />
    <div v-if="isSupported">
      <div v-show="openPop"
        class="backdrop-blur-md popover rounded text-gray-600 shadow ring-[#ccc] ring-inset flex flex-row absolute h-30px w-50px cursor-pointer justify-center items-center transition-all ring-1 dark:text-gray-400 dark:ring-[#333] active:scale-95 hover:scale-105"
        @click="copySelection">
        Copy
      </div>
    </div>
  </div>
</template>
