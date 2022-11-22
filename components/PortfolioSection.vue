<template>
  <div
    id="portfolio"
    class="overflow-hidden bg-white py-12 dark:bg-slate-900 lg:pb-16 lg:pt-20"
  >
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <p
        class="mb-4 text-base font-semibold uppercase leading-6 tracking-wide text-indigo-600"
      >
        Portfolio
      </p>
      <div class="grid grid-cols-10 gap-4">
        <div
          class="col-span-10 sm:col-span-5 md:col-span-10 lg:col-span-5 xl:col-span-6"
        >
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :slides-per-group-auto="true"
            :preload-images="false"
            :lazy="true"
            :breakpoints="{
              // xs: when window width is >= 475px
              475: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              // sm: when window width is >= 640px
              640: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              // md: when window width is >= 768px
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              // lg: when window width is >= 1024px
              1024: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              // xl: when window width is >= 1280px
              1280: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              // 2xl: when window width is >= 1536px
              1536: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }"
            :slides-per-group="1"
            :space-between="6"
            :navigation="{
              nextEl: '.sbutton-next',
              prevEl: '.sbutton-prev',
              disabledClass: 'sbutton-disabled',
              hiddenClass: 'sbutton-hidden',
            }"
            :pagination="paginationCustom"
            :auto-height="true"
            class="w-[99.9%] !pb-4"
          >
            <template #wrapper-start></template>
            <swiper-slide
              v-for="(portfolio, index) in error
                ? portfoliosSample
                : portfolios.data"
              :key="portfolio.attributes.title"
              class="max-w-full"
            >
              <div
                class="flex flex-col rounded-lg border border-gray-200 bg-gray-50 shadow-sm dark:border-slate-900 dark:bg-slate-800"
              >
                <div class="relative" @click="controlledSwiper.slideTo(index)">
                  <img
                    class="swiper-lazy h-64 w-full rounded-t-lg object-cover"
                    :data-src="
                      error
                        ? portfolio.attributes.cover.data.attributes.url
                        : formatImageUrl(
                            portfolio.attributes.cover.data.attributes.formats
                              .medium.url
                          )
                    "
                    :src="
                      error
                        ? portfolio.attributes.cover.data.attributes.url
                        : formatImageUrl(
                            portfolio.attributes.cover.data.attributes.formats
                              .thumbnail.url
                          )
                    "
                    :alt="
                      error
                        ? portfolio.attributes.cover.data.attributes
                            .alternativeText
                        : portfolio.attributes.cover.data.attributes
                            .alternativeText
                    "
                  />
                  <div class="swiper-lazy-preloader"></div>
                </div>
                <div class="flex flex-1 flex-col justify-between">
                  <div
                    class="mt-4 max-w-fit rounded-r-md bg-indigo-600 py-1 px-4 text-[0.7rem] font-semibold uppercase leading-loose tracking-wider text-white dark:bg-indigo-700 dark:text-slate-100"
                  >
                    {{ portfolio.attributes.category }}
                  </div>
                  <a href="#">
                    <h5
                      class="mt-2 px-4 pt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100"
                    >
                      {{ portfolio.attributes.title }}
                    </h5>
                  </a>
                  <span
                    class="mt-4 pb-1 pr-2 text-right text-xs font-semibold uppercase text-gray-400 dark:text-slate-500 dark:text-slate-400"
                  >
                    {{ formatDate(portfolio.attributes.date) }}
                  </span>
                </div>
              </div>
            </swiper-slide>
            <div class="sbutton-prev flex justify-center">
              <ChevronLeftIcon class="h-6 w-6" />
            </div>
            <div class="sbutton-next flex justify-center">
              <ChevronRightIcon class="h-6 w-6" />
            </div>
            <template #wrapper-end></template>
          </swiper>
          <nav aria-label="Progress" class="z-10 w-full px-4">
            <ol
              role="list"
              class="custom-pagination-horizontal flex items-center justify-center"
            >
              <li></li>
            </ol>
          </nav>
        </div>

        <div
          class="col-span-10 space-y-4 px-4 sm:col-span-5 md:col-span-10 lg:col-span-5 xl:col-span-4"
        >
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="2"
            :preload-images="false"
            :lazy="true"
            class="col-span-2 w-full"
            :navigation="{
              nextEl: '.sbutton-detached-next',
              prevEl: '.sbutton-detached-prev',
              disabledClass: 'sbutton-disabled',
              hiddenClass: 'sbutton-hidden',
            }"
            :auto-height="true"
            @swiper="setControlledSwiper"
          >
            <swiper-slide
              v-for="portfolio in error ? portfoliosSample : portfolios.data"
              :key="portfolio.attributes.title"
              class="max-w-full px-1 pb-1"
            >
              <div
                class="text-3xl font-extrabold capitalize leading-tight text-gray-900 dark:text-slate-200 sm:text-4xl"
              >
                {{ portfolio.attributes.title }}
              </div>
              <div class="text-gray-500 dark:text-slate-400">
                {{ portfolio.attributes.description }}
              </div>
              <swiper
                :modules="modules"
                :slides-per-view="2"
                :space-between="4"
                :breakpoints="{
                  // xs: when window width is >= 475px
                  475: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                  },
                  // sm: when window width is >= 640px
                  640: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                  },
                  // md: when window width is >= 768px
                  768: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                  },
                  // lg: when window width is >= 1024px
                  1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                  },
                  // xl: when window width is >= 1280px
                  1280: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                  },
                  // 2xl: when window width is >= 1536px
                  1536: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                  },
                }"
                :navigation="{
                  nextEl: '.sbutton-next',
                  prevEl: '.sbutton-prev',
                  disabledClass: 'sbutton-disabled',
                  hiddenClass: 'sbutton-hidden',
                }"
                class="gallery z-40 mt-4 w-full"
                nested
              >
                <template #wrapper-start></template>
                <swiper-slide
                  v-for="(pimg, key) in portfolio.attributes.previews.data"
                  :key="key"
                  class="max-w-full"
                >
                  <a
                    :key="key"
                    :href="
                      error
                        ? pimg.attributes.url
                        : formatImageUrl(pimg.attributes.url)
                    "
                    :data-pswp-width="pimg.attributes.width"
                    :data-pswp-height="pimg.attributes.height"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      class="swiper-lazy h-24 w-full rounded-md border border-gray-100 object-cover dark:border-slate-800"
                      :src="
                        error
                          ? pimg.attributes.url
                          : formatImageUrl(
                              pimg.attributes.formats.thumbnail.url
                            )
                      "
                      :alt="
                        error
                          ? pimg.attributes.alternativeText
                          : pimg.attributes.alternativeText
                      "
                    />
                    <div class="swiper-lazy-preloader"></div>
                  </a>
                </swiper-slide>
                <template #wrapper-end></template>
                <div class="sbutton-prev flex justify-center">
                  <ChevronLeftIcon class="h-6 w-6" />
                </div>
                <div class="sbutton-next flex justify-center">
                  <ChevronRightIcon class="h-6 w-6" />
                </div>
              </swiper>
            </swiper-slide>
          </swiper>
          <div class="flex justify-end space-x-1 overflow-hidden">
            <button class="sbutton-detached-prev">
              <ChevronDoubleLeftIcon class="h-5 w-5" />
            </button>
            <button class="sbutton-detached-next">
              <ChevronDoubleRightIcon class="h-5 w-5" />
            </button>
          </div>
          <div
            class="custom-pagination-item relative w-full max-w-[4rem]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFetch, useRuntimeConfig } from 'nuxt/app'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Lazy } from 'swiper'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/lazy'
import 'swiper/css/scrollbar'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/vue/20/solid'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

let lightbox = null

onMounted(() => {
  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      gallery: '.gallery',
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe'),
    })
    lightbox.init()
  }
})

const config = useRuntimeConfig()

const controlledSwiper = ref(null)

const setControlledSwiper = (swiper) => {
  controlledSwiper.value = swiper
}

const { data: portfolios, error } = await useFetch(
  `${config.public.strapiUrl}/api/portfolios?populate=deep&sort=date:DESC`
)

const paginationCustom = {
  el: '.custom-pagination-horizontal',
  type: 'custom',
  bulletClass: 'custom-pagination-item',
  bulletElement: 'li',
  clickable: true,
  renderCustom: renderCarouselHorizontalPaginationBullets,
}

const modules = [Navigation, Pagination, Scrollbar, A11y, Lazy]

const formatDate = (date) => {
  if (date === null) return
  date = new Date(date)
  const month = date.getUTCMonth() + 1 // months from 1-12
  const day = date.getUTCDate()
  if (day === 1 && month === 1) {
    return date.toLocaleString('fr-fr', {
      year: 'numeric',
    })
  } else {
    return date.toLocaleString('fr-fr', {
      month: 'long',
      year: 'numeric',
    })
  }
}

const formatImageUrl = (url) => {
  const isUrl = (string) => {
    try {
      return Boolean(new URL(string))
    } catch (e) {
      return false
    }
  }
  if (isUrl(url)) {
    return url
  }
  return config.public.strapiUrl + url
}

const portfoliosSample = [
  {
    attributes: {
      title: '0. Site de La Boiserie',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et posuere nisl, non tincidunt nunc. Nullam tempor metus ac arcu cursus, sed dignissim quam ultrices. Mauris quis tellus libero. Morbi tincidunt nunc a mi ornare accumsan. Donec in felis ultricies libero dignissim feugiat in vel odio. Fusce ac nunc sapien. Curabitur non pulvinar enim. Vivamus eget odio augue. Integer mollis nisl in condimentum posuere. Nullam id diam sit amet ligula suscipit ornare.',
      category: 'Développement web',
      cover: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-1.2.1&q=80&fm=jpg',
          },
        },
      },
      date: '2022-11-05',
      previews: {
        data: [
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
        ],
      },
    },
  },
  {
    attributes: {
      title:
        "1. L'art de faire chier les gens avec ces compétences en Cybersécurité",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et posuere nisl, non tincidunt nunc. Nullam tempor metus ac arcu cursus, sed dignissim quam ultrices. Mauris quis tellus libero. Morbi tincidunt nunc a mi ornare accumsan. Donec in felis ultricies libero dignissim feugiat in vel odio. Fusce ac nunc sapien. Curabitur non pulvinar enim. Vivamus eget odio augue. Integer mollis nisl in condimentum posuere. Nullam id diam sit amet ligula suscipit ornare.',
      category: 'Blockchain',
      cover: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1642543348763-9f7b40b3abdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&q=80',
            alternativeText: '',
          },
        },
      },
      date: '2022-10-26',
      previews: {
        data: [
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
        ],
      },
    },
  },
  {
    attributes: {
      title: "2. Etat de l'art de la blockchain",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et posuere nisl, non tincidunt nunc. Nullam tempor metus ac arcu cursus, sed dignissim quam ultrices. Mauris quis tellus libero. Morbi tincidunt nunc a mi ornare accumsan. Donec in felis ultricies libero dignissim feugiat in vel odio. Fusce ac nunc sapien. Curabitur non pulvinar enim. Vivamus eget odio augue. Integer mollis nisl in condimentum posuere. Nullam id diam sit amet ligula suscipit ornare.',
      category: 'Blockchain',
      cover: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1642543348763-9f7b40b3abdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&q=80',
            alternativeText: '',
          },
        },
      },
      date: '2022-10-26',
      previews: {
        data: [
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
        ],
      },
    },
  },
  {
    attributes: {
      title: '3. Comment je suis devenus végétarien',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et posuere nisl, non tincidunt nunc. Nullam tempor metus ac arcu cursus, sed dignissim quam ultrices. Mauris quis tellus libero. Morbi tincidunt nunc a mi ornare accumsan. Donec in felis ultricies libero dignissim feugiat in vel odio. Fusce ac nunc sapien. Curabitur non pulvinar enim. Vivamus eget odio augue. Integer mollis nisl in condimentum posuere. Nullam id diam sit amet ligula suscipit ornare.',
      category: 'Blockchain',
      cover: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1642543348763-9f7b40b3abdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&q=80',
            alternativeText: '',
          },
        },
      },
      date: '2022-10-26',
      previews: {
        data: [
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
        ],
      },
    },
  },
  {
    attributes: {
      title: '4. Comment je suis devenus végétarien',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et posuere nisl, non tincidunt nunc. Nullam tempor metus ac arcu cursus, sed dignissim quam ultrices. Mauris quis tellus libero. Morbi tincidunt nunc a mi ornare accumsan. Donec in felis ultricies libero dignissim feugiat in vel odio. Fusce ac nunc sapien. Curabitur non pulvinar enim. Vivamus eget odio augue. Integer mollis nisl in condimentum posuere. Nullam id diam sit amet ligula suscipit ornare.',
      category: 'Blockchain',
      cover: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1642543348763-9f7b40b3abdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&q=80',
            alternativeText: '',
          },
        },
      },
      date: '2022-10-26',
      previews: {
        data: [
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
        ],
      },
    },
  },
  {
    attributes: {
      title: '5. Comment je suis devenus végétarien',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et posuere nisl, non tincidunt nunc. Nullam tempor metus ac arcu cursus, sed dignissim quam ultrices. Mauris quis tellus libero. Morbi tincidunt nunc a mi ornare accumsan. Donec in felis ultricies libero dignissim feugiat in vel odio. Fusce ac nunc sapien. Curabitur non pulvinar enim. Vivamus eget odio augue. Integer mollis nisl in condimentum posuere. Nullam id diam sit amet ligula suscipit ornare.',
      category: 'Blockchain',
      cover: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1642543348763-9f7b40b3abdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&q=80',
            alternativeText: '',
          },
        },
      },
      date: '2022-10-26',
      previews: {
        data: [
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
        ],
      },
    },
  },
  {
    attributes: {
      title: '6. Comment je suis devenus végétarien',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et posuere nisl, non tincidunt nunc. Nullam tempor metus ac arcu cursus, sed dignissim quam ultrices. Mauris quis tellus libero. Morbi tincidunt nunc a mi ornare accumsan. Donec in felis ultricies libero dignissim feugiat in vel odio. Fusce ac nunc sapien. Curabitur non pulvinar enim. Vivamus eget odio augue. Integer mollis nisl in condimentum posuere. Nullam id diam sit amet ligula suscipit ornare.',
      category: 'Blockchain',
      cover: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1642543348763-9f7b40b3abdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&q=80',
            alternativeText: '',
          },
        },
      },
      date: '2022-10-26',
      previews: {
        data: [
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
          {
            attributes: {
              url: 'https://source.unsplash.com/random/1024x768/?website-designer',
              alternativeText: '',
            },
          },
        ],
      },
    },
  },
]

/**
 * Generate custom pagination bullets.
 *
 * @param {Swiper} swiper
 * @param {number} current
 * @param {number} total
 *
 * @return {string}
 */
function renderCarouselHorizontalPaginationBullets(swiper, current, total) {
  const bullets = []

  for (let index = 1; index <= total; index++) {
    const liEl = document.createElement('li')
    liEl.className =
      'custom-pagination-item relative' +
      (index !== total ? ' w-full max-w-[4rem] xl:max-w-[8rem]' : '')
    const divEl = document.createElement('div')
    divEl.className = 'absolute inset-0 flex items-center'
    divEl.setAttribute('aria-hidden', 'true')

    const nestedDivEl = document.createElement('div')
    const spanEl = document.createElement('span')

    if (index < current) {
      nestedDivEl.className = 'h-0.5 w-full bg-indigo-600'
      spanEl.className =
        'relative flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900 cursor-pointer'
      const nestedSpanEl = document.createElement('span')
      nestedSpanEl.className = 'sr-only'
      const nestedSpanElTextNode = document.createTextNode('Step ' + index)
      nestedSpanEl.appendChild(nestedSpanElTextNode)
      spanEl.appendChild(nestedSpanEl)
    } else if (index === current) {
      nestedDivEl.className = 'h-0.5 w-full bg-gray-200 dark:bg-slate-700'
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
      nestedDivEl.className = 'h-0.5 w-full bg-gray-200 dark:bg-slate-700'
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
</script>

<style scoped></style>
