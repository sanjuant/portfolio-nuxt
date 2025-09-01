<template>
  <div id="home" class="relative overflow-hidden bg-white dark:bg-slate-900">
    <div class="lg:h-152 max-w-7xl xl:ml-32">
      <div
        class="relative z-10 mx-auto bg-white pb-12 dark:bg-slate-900 lg:w-full lg:max-w-2xl xl:mx-0"
      >
        <svg
          class="absolute inset-y-0 right-[-32px] -z-10 hidden hidden h-full w-48 translate-x-1/2 transform text-white dark:text-slate-900 xl:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,-50 100,0 50,100 0,100" />
        </svg>

        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="sm:text-center lg:text-left">
            <h2
              class="flex text-4xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100 sm:text-5xl md:text-6xl"
            >
              <span class="flex w-full flex-col pt-10">
                <span class="block sm:text-center xl:inline">
                  {{ hero?.data.attributes.welcome ?? 'Welcome' }}
                </span>
                <span class="block flex min-h-28 md:min-h-48">
                  <span
                    class="my-auto block overflow-hidden text-indigo-600 sm:m-auto sm:text-center"
                    >I'm
                    <VueWriterEsm
                      :array="writer.values"
                      :delay="writer.delay"
                      :erase-speed="writer.eraseSpeed"
                      :type-speed="writer.typeSpeed"
                      :caret="writer.caret"
                  /></span>
                </span>
              </span>
            </h2>
            <p
              class="mt-3 text-base text-gray-500 dark:text-slate-200 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0"
            >
              {{
                hero?.data.attributes.about_me ??
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ante dapibus, ultrices risus in, tristique ligula. Nunc fermentum felis convallis lorem mollis, nec mattis est mollis.'
              }}
            </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
              <div class="rounded-md shadow">
                <a
                  :href="hero?.data.attributes.cv.data?.attributes.url ?? '#'"
                  target="_blank"
                  class="flex w-full items-center justify-center overflow-hidden rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-gray-50 transition duration-150 ease-in-out hover:bg-indigo-700 dark:bg-indigo-800 dark:text-slate-100 dark:hover:bg-indigo-900 md:py-4 md:px-10 md:text-lg"
                >
                  <span class="shrink-0 md:hidden lg:block"
                    >Télécharger mon&nbsp;</span
                  ><span class="shrink-0">CV 📥</span>
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#portfolio"
                  class="flex w-full items-center justify-center overflow-hidden rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-50 hover:text-indigo-600 dark:bg-indigo-400 dark:text-indigo-900 dark:hover:bg-indigo-300 dark:hover:text-indigo-800 md:py-4 md:px-10 md:text-lg"
                >
                  <span class="shrink-0 md:hidden lg:block"
                    >Explorer mon&nbsp;</span
                  ><span class="shrink-0">Portfolio 🗃️</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 xl:block">
      <WorldMap />
    </div>
  </div>
</template>

<script setup>
import VueWriterEsm from 'vue-writer'
import { useFetch, useRuntimeConfig } from 'nuxt/app'
const config = useRuntimeConfig()

const { data: hero } = await useFetch(
  `${config.public.strapiUrl}/api/hero?populate=deep`
)

const writer = computed(() => {
  let values
  if (hero.value?.data.attributes.writer.length > 0) {
    values = hero.value.data.attributes.writer.map((x) => x.title)
  } else {
    values = ['Job Title', 'Enthusiast']
  }

  return {
    values,
    eraseSpeed: 70,
    typeSpeed: 100,
    delay: 10000,
    caret: 'underscore',
  }
})
</script>

<style>
.is-typed {
  display: inline;
}

.typed-line {
  height: 180px;
}

.is-typed .typed {
  line-height: 1.5em;
}

.is-typed span.cursor {
  line-height: 3rem;
  display: inline-block;
  width: 3px;
  align-items: flex-end;
  background-color: #4f46e5;
  animation: blink 1s infinite;
  transform: translateX(5px) translateY(5px);
}

.is-typed span.underscore {
  line-height: 2.75rem;
  background-color: #4f46e5;
  display: inline-flex;
  width: 20px;
  height: 3px;
  align-items: flex-end;
  transform: translateX(5px) translateY(5px);
  animation: blink 1s infinite;
}

.is-typed span.cursor.typing {
  animation: none;
}

@keyframes blink {
  49% {
    background-color: #4f46e5;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
}
</style>