<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="overflow-hidden bg-gray-50 py-12 dark:bg-slate-800 lg:py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-prose lg:max-w-none">
        <p
          class="mb-12 hidden text-base font-semibold uppercase leading-6 tracking-wide text-indigo-600 dark:text-indigo-500 lg:block"
        >
          Formations et Expériences
        </p>
        <div class="flex flex-col gap-8 lg:flex-row lg:gap-4">
          <ol
            id="education-and-training"
            class="relative order-2 block pb-4 text-gray-900 dark:text-slate-100 lg:order-1 lg:flex-1"
          >
            <li
              class="mb-4 block text-base font-semibold uppercase leading-6 tracking-wide text-indigo-600 dark:text-indigo-600 lg:hidden"
            >
              Formations Professionnelles
            </li>
            <li
              class="mr-8 mb-8 hidden text-right text-3xl font-extrabold capitalize leading-tight sm:text-4xl lg:block"
            >
              Formations Professionnelles
            </li>
            <template v-if="!educationsError">
              <li
                v-for="(education, educationIdx) in educations.data"
                :key="education.attributes.slug"
                ref="educationsAndExperiences"
                class="relative pl-8 before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-gray-300 lg:pl-0 lg:pr-8 lg:text-right lg:before:left-[unset] lg:before:right-2"
                :class="[
                  educationIdx !== educations.length - 1 ? 'pb-5' : 'pb-3',
                ]"
              >
                <span
                  class="absolute left-0 top-[0.350rem] h-[1.125rem] w-[1.125rem] rounded-full bg-gray-300 lg:left-[unset] lg:right-0"
                ></span>
                <h3 class="mb-1 font-bold uppercase">
                  {{ education.attributes.title }}
                </h3>
                <div class="flex flex-row flex-wrap lg:justify-end">
                  <div
                    class="mr-4 flex shrink-0 flex-row items-center font-normal lg:mr-0"
                  >
                    <BuildingLibraryIcon
                      class="mr-1 h-4 w-4 text-gray-400 dark:text-slate-400"
                    />
                    <span
                      class="text-xs uppercase text-gray-500 dark:text-slate-400"
                    >
                      <template v-if="education.attributes.company_website">
                        <a
                          :href="education.attributes.company_website"
                          target="_blank"
                          class="hover:underline hover:underline-offset-4"
                          >{{ education.attributes.company_name }}</a
                        >
                      </template>
                      <template v-else>
                        {{ education.attributes.company_name }}
                      </template>
                    </span>
                  </div>

                  <div class="flex shrink-0 flex-row items-center lg:ml-4">
                    <ClockIcon
                      class="mr-1 h-4 w-4 text-gray-400 dark:text-slate-400"
                    />
                    <div
                      class="text-xs uppercase text-gray-500 dark:text-slate-400"
                    >
                      De
                      {{ formatDate(education.attributes.start_date) }} à
                      {{ formatDate(education.attributes.end_date) }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="education.attributes.graduating_certification"
                  class="mt-1 text-sm dark:text-slate-100"
                >
                  {{ education.attributes.graduating_certification }}
                </div>
                <div
                  v-if="education.attributes.description"
                  class="has-read-more mt-3 text-gray-500 dark:text-slate-400"
                >
                  <div v-html="education.attributes.description" />
                </div>
                <div class="rmb mt-4 !hidden lg:justify-end">
                  <div class="rmb-text lg:order-2">Voir plus</div>
                  <div class="rmb-wrapper lg:order-1">
                    <div class="rmb-start">
                      <div class="connector-wrapper">
                        <div class="connector"></div>
                      </div>
                      <span class="circle-border"
                        ><span class="circle-dot"></span
                      ></span>
                    </div>
                    <div class="rmb-end">
                      <span class="circle-border"
                        ><span class="circle-dot"></span
                      ></span>
                    </div>
                  </div>
                </div>
                <span
                  v-if="educationIdx === educations.data.length - 1"
                  class="absolute left-0 -bottom-4 h-[1.125rem] w-[1.125rem] rounded-full bg-gray-300 lg:left-[unset] lg:right-0"
                ></span>
              </li>
            </template>
          </ol>
          <ol
            id="professionnal-experiences"
            class="relative order-1 block pb-4 text-gray-900 dark:text-slate-100 lg:order-2 lg:flex-1"
          >
            <li
              class="mb-4 block text-base font-semibold uppercase leading-6 tracking-wide text-indigo-600 dark:text-indigo-600 lg:hidden"
            >
              Expériences Professionnelles
            </li>
            <li
              class="ml-8 mb-8 hidden text-3xl font-extrabold leading-tight text-gray-900 dark:text-slate-100 sm:text-4xl lg:block"
            >
              Expériences Professionnelles
            </li>
            <template v-if="!experiencesError">
              <li
                v-for="(experience, experienceIdx) in experiences.data"
                :key="experience.attributes.slug"
                ref="educationsAndExperiences"
                class="relative w-full pl-8 before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-indigo-500"
                :class="[
                  experienceIdx !== experiences.length - 1 ? 'pb-5' : 'pb-3',
                ]"
              >
                <span
                  class="absolute left-0 top-[0.350rem] h-[1.125rem] w-[1.125rem] rounded-full bg-indigo-500"
                ></span>
                <h3
                  class="mb-1 font-bold uppercase text-gray-900 dark:text-slate-100"
                >
                  {{ experience.attributes.title }}
                </h3>
                <div class="mb-3 flex flex-row flex-wrap">
                  <div
                    class="mr-4 flex shrink-0 flex-row items-center font-normal"
                  >
                    <BuildingOfficeIcon
                      class="mr-1 h-4 w-4 text-gray-400 dark:text-slate-400"
                    />
                    <span
                      class="text-xs uppercase text-gray-500 dark:text-slate-400"
                    >
                      <template v-if="experience.attributes.company_website">
                        <a
                          :href="experience.attributes.company_website"
                          target="_blank"
                          class="hover:underline hover:underline-offset-4"
                          >{{ experience.attributes.company_name }}</a
                        >
                      </template>
                      <template v-else>
                        {{ experience.attributes.company_name }}
                      </template>
                    </span>
                  </div>
                  <div class="flex shrink-0 flex-row items-center font-normal">
                    <ClockIcon
                      class="mr-1 h-4 w-4 text-gray-400 dark:text-slate-400"
                    />
                    <div
                      class="text-xs uppercase text-gray-500 dark:text-slate-400"
                    >
                      De
                      {{ formatDate(experience.attributes.start_date) }}
                      à
                      {{ formatDate(experience.attributes.end_date) }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="experience.attributes.description"
                  class="has-read-more text-gray-500 dark:text-slate-400"
                >
                  <div v-html="experience.attributes.description" />
                </div>

                <div class="rmb mt-4 !hidden">
                  <div class="rmb-text">Voir plus</div>

                  <div class="rmb-wrapper">
                    <div class="rmb-start">
                      <div class="connector-wrapper">
                        <div class="connector"></div>
                      </div>
                      <span class="circle-border"
                        ><span class="circle-dot"></span
                      ></span>
                    </div>
                    <div class="rmb-end">
                      <span class="circle-border"
                        ><span class="circle-dot"></span
                      ></span>
                    </div>
                  </div>
                </div>

                <span
                  v-if="experienceIdx === experiences.data.length - 1"
                  class="absolute left-0 -bottom-4 h-[1.125rem] w-[1.125rem] rounded-full bg-indigo-500"
                ></span>
              </li>
            </template>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ClockIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
} from '@heroicons/vue/20/solid'

import { ref, onMounted } from 'vue'
import { useFetch, useRuntimeConfig } from 'nuxt/app'
const config = useRuntimeConfig()
const educationsAndExperiences = ref(null)

const { data: educations, error: educationsError } = await useFetch(
  `${config.public.strapiUrl}/api/educations-and-trainings?populate=%2A&sort=start_date:DESC`
)

const { data: experiences, error: experiencesError } = await useFetch(
  `${config.public.strapiUrl}/api/professionnal-experiences?populate=%2A&sort=start_date:DESC`
)

const formatDate = (date) => {
  if (date === null || new Date(date) > new Date()) {
    return "Aujourd'hui"
  } else {
    return new Date(date).toLocaleString('fr-fr', {
      month: 'long',
      year: 'numeric',
    })
  }
}

onMounted(() => {
  const elements = educationsAndExperiences.value
  elements.forEach((el) => {
    const readMore = el.querySelector('.has-read-more')
    if (readMore === null || undefined === readMore) return
    const button = el.querySelector('div.rmb')
    const text = button.querySelector('div.rmb-text')
    if (readMore.offsetHeight < readMore.scrollHeight) {
      readMore.classList.add('read-more')
      button.classList.remove('!hidden')
      button.addEventListener(
        'click',
        () => {
          if (button.classList.contains('is-active')) {
            readMore.classList.add('read-more')
            readMore.classList.remove('read-more-activate')
            readMore.removeEventListener('click', null)
            button.classList.remove('is-active')
            text.innerText = 'Voir plus'
          } else {
            readMore.classList.add('read-more-activate')
            readMore.classList.remove('read-more')
            button.classList.add('is-active')
            text.innerText = 'Voir moins'
          }
        },
        false
      )
    } else {
      readMore.classList.remove('has-read-more')
      button.remove()
    }
  })
})
</script>

<style>
.has-read-more {
  max-height: 144px;
  overflow: hidden;
}
.read-more {
  position: relative;
}
.read-more:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  content: ' ';
  background-image: linear-gradient(
    to bottom,
    transparent,
    theme('colors.gray.50')
  );
  height: 50%;
}
.read-more-activate {
  height: auto;
  max-height: none;
}
@media (prefers-color-scheme: dark) {
  .read-more:after {
    background-image: linear-gradient(
      to bottom,
      transparent,
      theme('colors.slate.800')
    );
  }
}

.rmb {
  display: flex;
  align-items: center;
}
.rmb-text {
  letter-spacing: 0.09em;
  text-transform: uppercase;
  font-weight: 900;
  color: theme('colors.indigo.600');
  font-size: 0.7rem;
  cursor: pointer;
  width: 6rem;
}

.rmb-text:hover + .rmb-wrapper .rmb-end .circle-border {
  border-color: theme('colors.gray.400');
  background-color: theme('colors.gray.300');
}

.rmb-wrapper {
  bottom: 10px;
  left: 0;
  width: 3rem;
  justify-content: center;
  align-items: center;
  display: flex;
}

.rmb.is-active {
  opacity: 0.3;
}
.rmb.is-active .connector {
  background-color: theme('colors.indigo.600');
}
.rmb.is-active .circle-dot {
  background-color: transparent;
}
.rmb.is-active .circle-border:hover {
  background-color: theme('colors.gray.400');
  border-color: theme('colors.indigo.600');
}
.rmb.is-active .rmb-end .circle-border {
  background-color: theme('colors.gray.50');
  border-color: theme('colors.indigo.600');
}
.rmb.is-active .rmb-end .circle-dot {
  background-color: theme('colors.indigo.600');
}
.rmb.is-active .rmb-text:hover + .rmb-wrapper .rmb-start .circle-border {
  background-color: theme('colors.gray.400');
  border-color: theme('colors.indigo.600');
}
.rmb.is-active .rmb-text:hover + .rmb-wrapper .rmb-end .circle-border {
  border-color: theme('colors.indigo.600');
}

.rmb-start {
  max-width: 2rem;
  width: 100%;
  position: relative;
}
.rmb-start .connector-wrapper {
  align-items: center;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
.rmb-start .connector {
  background-color: theme('colors.gray.200');
  width: 100%;
  height: 0.125rem;
}

.circle-border {
  background-color: theme('colors.gray.50');
  border-color: theme('colors.indigo.600');
  border-width: 2px;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 0.75rem;
  height: 0.75rem;
  display: flex;
  position: relative;
}

.circle-dot {
  background-color: theme('colors.indigo.600');
  border-radius: 9999px;
  width: 0.375rem;
  height: 0.375rem;
}

.rmb-end .circle-border {
  background-color: theme('colors.gray.50');
  border-color: theme('colors.gray.200');
}
.rmb-end .circle-border:hover {
  border-color: theme('colors.gray.400');
  background-color: theme('colors.gray.300');
}
.rmb-end .circle-dot {
  background-color: transparent;
}

@media (prefers-color-scheme: dark) {
  .rmb-text {
    color: theme('colors.indigo.500');
  }

  .rmb-text:hover + .rmb-wrapper .rmb-end .circle-border {
    border-color: theme('colors.slate.600');
    background-color: theme('colors.slate.500');
  }

  .rmb.is-active {
    opacity: 0.5;
  }
  .rmb.is-active .connector {
    background-color: theme('colors.indigo.500');
  }
  .rmb.is-active .circle-border:hover {
    background-color: theme('colors.slate.600');
    border-color: theme('colors.indigo.500');
  }
  .rmb.is-active .rmb-end .circle-border {
    background-color: theme('colors.slate.800');
    border-color: theme('colors.indigo.500');
  }
  .rmb.is-active .rmb-end .circle-dot {
    background-color: theme('colors.indigo.500');
  }
  .rmb.is-active .rmb-text:hover + .rmb-wrapper .rmb-start .circle-border {
    background-color: theme('colors.slate.600');
    border-color: theme('colors.indigo.500');
  }
  .rmb.is-active .rmb-text:hover + .rmb-wrapper .rmb-end .circle-border {
    border-color: theme('colors.indigo.500');
  }

  .rmb-start .connector {
    background-color: theme('colors.slate.400');
  }

  .circle-border {
    background-color: theme('colors.slate.800');
    border-color: theme('colors.indigo.500');
  }

  .circle-dot {
    background-color: theme('colors.indigo.500');
  }

  .rmb-end .circle-border {
    background-color: theme('colors.slate.800');
    border-color: theme('colors.slate.400');
  }
  .rmb-end .circle-border:hover {
    border-color: theme('colors.slate.600');
    background-color: theme('colors.slate.500');
  }
}
</style>
