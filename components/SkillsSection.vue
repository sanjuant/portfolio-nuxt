<template>
  <div
    id="skills"
    class="overflow-hidden bg-white py-12 dark:bg-slate-900 lg:pt-16 lg:pb-20"
  >
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-prose lg:max-w-none">
        <p
          class="text-base font-semibold uppercase leading-6 tracking-wide text-indigo-600"
        >
          Compétences
        </p>
        <div class="mt-4 flex flex-col lg:flex-row">
          <div class="lg:w-1/2 lg:pr-4">
            <swiper
              :modules="modules"
              :slides-per-view="1"
              :space-between="4"
              :auto-height="true"
              @swiper="setControlledSwiper"
            >
              <swiper-slide
                v-for="skill in error ? skillsSample : skills.data"
                :key="skill.attributes.name"
              >
                <h2
                  class="text-3xl font-extrabold leading-9 text-gray-900 dark:text-slate-200 sm:text-4xl sm:leading-10"
                >
                  {{ skill.attributes.title }}
                  <!--                  Used by the world's most average companies-->
                </h2>
                <p
                  class="mt-3 max-w-3xl text-lg leading-7 text-gray-500 dark:text-slate-400"
                >
                  {{ skill.attributes.description }}
                  <!--                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,-->
                  <!--                  egestas tempus tellus etiam sed. Quam a scelerisque amet-->
                  <!--                  ullamcorper eu enim et fermentum, augue.-->
                </p>
                <div v-if="skill.attributes.url !== ''" class="mt-8 sm:flex">
                  <div class="mt-3 sm:mt-0">
                    <a
                      class="focus:shadow-outline flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium leading-6 text-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-50 hover:text-indigo-600 dark:bg-indigo-400 dark:text-indigo-900 dark:hover:bg-indigo-300 dark:hover:text-indigo-800"
                      :href="skill.attributes.url"
                      target="_blank"
                      >Visiter le site web</a
                    >
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div
            class="mt-8 flex w-[92.78%] flex-row sm:w-[94.595%] md:w-[93.105%] lg:mt-0 lg:ml-4 lg:w-[43.184%] xl:w-[45%] 2xl:w-[46.053%]"
          >
            <div class="w-full">
              <div class="flex h-full items-center justify-center">
                <swiper
                  :modules="modules"
                  :slides-per-view="2"
                  :slides-per-group="2"
                  :space-between="2"
                  :pagination="paginationCustom"
                  :grid="{
                    fill: 'column',
                    rows: 3,
                  }"
                  :breakpoints="{
                    // md: when window width is >= 768px
                    768: {
                      slidesPerView: 3,
                      slidesPerGroup: 3,
                      grid: {
                        fill: 'row',
                        rows: 2,
                      },
                    },
                    // lg: when window width is >= 1024px
                    1024: {
                      slidesPerView: 2,
                      slidesPerGroup: 2,
                      grid: {
                        fill: 'column',
                        rows: 3,
                      },
                    },
                  }"
                  :navigation="{
                    nextEl: '.sbutton-next',
                    prevEl: '.sbutton-prev',
                    disabledClass: 'sbutton-disabled',
                    hiddenClass: 'sbutton-hidden',
                  }"
                  class="my-auto"
                >
                  <template #wrapper-start></template>
                  <swiper-slide
                    v-for="(skill, index) in error ? skillsSample : skills.data"
                    :key="skill.attributes.name"
                    class=""
                  >
                    <div
                      class="col-span-1 flex h-full cursor-pointer justify-center bg-gray-50 py-8 px-8 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                      @click="controlledSwiper.slideTo(index)"
                    >
                      <img
                        class="h-12 w-32"
                        :src="
                          error
                            ? skill.attributes.logo.data.attributes.url
                            : `${skill.attributes.logo.data.attributes.url}`
                        "
                        alt=""
                      />
                    </div>
                  </swiper-slide>
                  <template #wrapper-end></template>
                  <div class="sbutton-prev flex justify-center">
                    <ChevronLeftIcon class="h-6 w-6" />
                  </div>
                  <div class="sbutton-next flex justify-center">
                    <ChevronRightIcon class="h-6 w-6" />
                  </div>
                </swiper>
              </div>
            </div>
            <div class="pl-4">
              <div class="h-full w-full">
                <nav aria-label="Progress" class="z-10 h-full py-4">
                  <ol
                    role="list"
                    class="custom-pagination-vertical flex h-full h-full flex-col items-center justify-center"
                  >
                    <li></li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch, useRuntimeConfig } from 'nuxt/app'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Grid } from 'swiper'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/grid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()

const { data: skills, error } = useFetch(
  `${config.public.strapiUrl}/api/skills?populate=deep`
)

const controlledSwiper = ref(null)
const setControlledSwiper = (swiper) => {
  controlledSwiper.value = swiper
}

const modules = [Navigation, Pagination, Scrollbar, A11y, Grid]

const paginationCustom = {
  el: '.custom-pagination-vertical',
  type: 'custom',
  bulletClass: 'custom-pagination-item',
  bulletElement: 'li',
  clickable: true,
  renderCustom: renderCarouselVerticalPaginationBullets,
}

// onMounted(() => {
//   if (controlledSwiper.value) {
//     controlledSwiper.update()
//   }
// });

/**
 * Generate custom pagination bullets.
 *
 * @param {Swiper} swiper
 * @param {number} current
 * @param {number} total
 *
 * @return {string}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderCarouselVerticalPaginationBullets(swiper, current, total) {
  const bullets = []

  for (let index = 1; index <= total; index++) {
    const liEl = document.createElement('li')
    liEl.className =
      'custom-pagination-item relative ' +
      (index !== total ? 'h-full max-h-[4rem] xl:max-h-[8rem]' : '')
    const divEl = document.createElement('div')
    divEl.className = 'absolute inset-0 flex items-center left-2 -ml-px h-full'
    divEl.setAttribute('aria-hidden', 'true')

    const nestedDivEl = document.createElement('div')
    const spanEl = document.createElement('span')

    if (index < current) {
      nestedDivEl.className = 'w-0.5 h-full bg-indigo-600'
      spanEl.className =
        'relative flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900 cursor-pointer'
      const nestedSpanEl = document.createElement('span')
      nestedSpanEl.className = 'sr-only'
      const nestedSpanElTextNode = document.createTextNode('Step ' + index)
      nestedSpanEl.appendChild(nestedSpanElTextNode)
      spanEl.appendChild(nestedSpanEl)
    } else if (index === current) {
      nestedDivEl.className = 'w-0.5 h-full bg-gray-200 dark:bg-slate-700'
      spanEl.className =
        'relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-indigo-600 bg-white dark:bg-slate-900 cursor-pointer'
      const nestedSpanEl0 = document.createElement('span')
      nestedSpanEl0.className = 'h-1.5 w-1.5 bg-indigo-600 rounded-full'
      nestedSpanEl0.setAttribute('aria-hidden', 'true')
      const nestedSpanEl1 = document.createElement('span')
      nestedSpanEl1.className = 'sr-only'
      const nestedSpanEl1TextNode = document.createTextNode('Step ' + index)
      nestedSpanEl1.appendChild(nestedSpanEl1TextNode)
      spanEl.appendChild(nestedSpanEl0)
      spanEl.appendChild(nestedSpanEl1)
    } else {
      nestedDivEl.className = 'w-0.5 h-full bg-gray-200 dark:bg-slate-700'
      spanEl.className =
        'group relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-gray-400 dark:hover:border-slate-700 cursor-pointer'
      const nestedSpanEl0 = document.createElement('span')
      nestedSpanEl0.className =
        'h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-slate-700'
      nestedSpanEl0.setAttribute('aria-hidden', 'true')
      const nestedSpanEl1 = document.createElement('span')
      nestedSpanEl1.className = 'sr-only'
      const nestedSpanEl1TextNode = document.createTextNode('Step ' + index)
      nestedSpanEl1.appendChild(nestedSpanEl1TextNode)
      spanEl.appendChild(nestedSpanEl0)
      spanEl.appendChild(nestedSpanEl1)
    }
    divEl.appendChild(nestedDivEl)
    liEl.appendChild(divEl)
    liEl.appendChild(spanEl)
    liEl.setAttribute('data-slide', index.toString())

    bullets.push(liEl)
  }

  return bullets.map((bullet) => bullet.outerHTML).join(' ')
}

const skillsSample = [
  {
    attributes: {
      title: 'Workcation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. ',
      name: 'Workcation',
      url: '#',
      logo: {
        data: {
          attributes: {
            url: 'https://tailwindui.com/img/logos/workcation-logo-gray-400.svg',
            alternativeText: 'Workcation',
          },
        },
      },
      slug: '0',
    },
  },
  {
    attributes: {
      title: 'Mirage',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. ',
      name: 'Mirage',
      url: '#',
      logo: {
        data: {
          attributes: {
            url: 'https://tailwindui.com/img/logos/mirage-logo-gray-400.svg',
            alternativeText: 'Mirage',
          },
        },
      },
      slug: '1',
    },
  },
  {
    attributes: {
      title: 'Tuple',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. ',
      name: 'Tuple',
      url: '#',
      logo: {
        data: {
          attributes: {
            url: 'https://tailwindui.com/img/logos/tuple-logo-gray-400.svg',
            alternativeText: 'Tuple',
          },
        },
      },
      slug: '2',
    },
  },
  {
    attributes: {
      title: 'Laravel',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. ',
      name: 'Laravel',
      url: '#',
      logo: {
        data: {
          attributes: {
            url: 'https://tailwindui.com/img/logos/laravel-logo-gray-400.svg',
            alternativeText: 'Laravel',
          },
        },
      },
      slug: '3',
    },
  },
  {
    attributes: {
      title: 'StaticKit',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. ',
      name: 'StaticKit',
      url: '#',
      logo: {
        data: {
          attributes: {
            url: 'https://tailwindui.com/img/logos/statickit-logo-gray-400.svg',
            alternativeText: 'StaticKit',
          },
        },
      },
      slug: '4',
    },
  },
  {
    attributes: {
      title: 'Statamic',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. ',
      name: 'Statamic',
      url: '#',
      logo: {
        data: {
          attributes: {
            url: 'https://tailwindui.com/img/logos/statamic-logo-gray-400.svg',
            alternativeText: 'Statamic',
          },
        },
      },
      slug: '5',
    },
  },
  {
    attributes: {
      title: 'Workcation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. ',
      name: 'Workcation',
      url: '#',
      logo: {
        data: {
          attributes: {
            url: 'https://tailwindui.com/img/logos/workcation-logo-gray-400.svg',
            alternativeText: 'Workcation',
          },
        },
      },
      slug: '6',
    },
  },
]
</script>

<style scoped></style>
