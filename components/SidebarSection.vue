<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 z-40 flex md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex w-64 flex-col bg-gradient-to-b from-indigo-600 to-indigo-700 dark:from-indigo-800 dark:to-indigo-900"
          >
            <div class="flex-1 overflow-y-auto pt-5 pb-4">
              <div class="flex items-center">
                <div class="flex flex-1 flex-col px-4">
                  <div class="flex items-center justify-center">
                    <div class="relative">
                      <span
                        class="absolute top-0 right-0 z-10 h-[3.5rem] w-[3.5rem] rounded-full border-4 border-indigo-600 bg-green-100 dark:border-indigo-800 dark:bg-purple-500"
                      />
                      <span
                        class="absolute -top-2 -right-2 h-[15rem] w-[15rem] rounded-full border-4 border-indigo-600 bg-green-100 dark:border-indigo-800 dark:bg-purple-500"
                      />
                      <img
                        class="relative mx-auto h-[14rem] w-[14rem] flex-shrink-0 rounded-full border-4 border-solid border-indigo-600 dark:border-indigo-800"
                        :src="
                          error
                            ? 'https://via.placeholder.com/224?text=Picture+224x224'
                            : formatImageUrl(
                                identity.data.attributes.picture.data.attributes.url
                              )
                        "
                        :alt="
                          error
                            ? 'Photo de profil en 224*224 minimum, ratio de 1/1'
                            : identity.data.attributes.picture.data.attributes
                                .alternativeText
                        "
                      />
                    </div>
                  </div>

                  <h3
                    class="text-md mt-6 text-center font-bold text-gray-50 dark:text-slate-50"
                  >
                    {{
                      error ? 'FirstName' : identity.data.attributes.first_name
                    }}
                    {{
                      error ? 'LastName' : identity.data.attributes.last_name
                    }}
                  </h3>
                  <dl class="mt-1 flex flex-grow flex-col justify-between">
                    <!--                    <dt class="sr-only">Title</dt>-->
                    <dd
                      class="text-md text-center font-semibold text-gray-100 dark:text-slate-100"
                    >
                      {{ error ? 'JobTitle' : identity.data.attributes.job }}
                    </dd>
                    <!--                    <dt class="sr-only">Role</dt>-->
                    <dd class="mt-4 flex flex-wrap justify-center">
                      <span
                        v-for="skill in error
                          ? [
                              { id: 1, quality: 'Quality' },
                              { id: 2, quality: 'Quality' },
                              { id: 3, quality: 'Quality' },
                              { id: 4, quality: 'Quality' },
                              { id: 5, quality: 'Quality' },
                            ]
                          : identity.data.attributes.soft_skills"
                        :key="skill.id"
                        class="mx-1 mt-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-purple-500 dark:text-slate-100"
                        >{{ skill.quality }}</span
                      >
                    </dd>
                  </dl>
                </div>
              </div>
              <nav class="mt-5 space-y-1 px-2">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-indigo-800 text-gray-50 dark:bg-indigo-900 dark:text-slate-50'
                      : 'text-gray-100 hover:bg-indigo-600 hover:bg-opacity-75 dark:text-slate-100 dark:hover:bg-indigo-800',
                    'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                  ]"
                >
                  <component
                    :is="item.icon"
                    class="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300 dark:text-indigo-500"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </nav>
            </div>
            <div
              class="flex flex-shrink-0 justify-center border-t border-indigo-800 p-4"
            >
              <div class="mt-0">
                <p class="text-center text-xs leading-6 text-gray-300">
                  © 2022 Thibaut SANJUAN.
                </p>
                <p class="text-center text-xs leading-6 text-gray-300">
                  All rights reserved.
                </p>
              </div>
            </div>
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon
                    class="h-6 w-6 text-gray-100 hover:text-gray-300 dark:text-slate-100 dark:hover:text-slate-300"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </TransitionChild>
          </div>
        </TransitionChild>
        <div class="w-14 flex-shrink-0" aria-hidden="true">
          <!-- FORCE SIDEBAR TO SHRINK TO FIT CLOSE ICON -->
        </div>
      </Dialog>
    </TransitionRoot>
    <div
      class="z-30 hidden w-64 drop-shadow-[0_10px_5px_rgba(0,0,0,0.25)] md:fixed md:inset-y-0 md:flex md:flex-col"
    >
      <div
        class="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-indigo-600 to-indigo-700 dark:from-indigo-800 dark:to-indigo-900"
      >
        <div class="flex-1 overflow-y-auto pt-5 pb-4">
          <div class="flex items-center">
            <div class="flex flex-1 flex-col px-4">
              <div class="flex items-center justify-center">
                <div class="relative">
                  <span
                    class="absolute top-0 right-0 z-10 h-[3.5rem] w-[3.5rem] rounded-full border-4 border-indigo-600 bg-green-100 dark:border-indigo-800 dark:bg-purple-500"
                  />
                  <span
                    class="absolute -top-2 -right-2 h-[15rem] w-[15rem] rounded-full border-4 border-indigo-600 bg-green-100 dark:border-indigo-800 dark:bg-purple-500"
                  />
                  <img
                    class="relative mx-auto h-[14rem] w-[14rem] flex-shrink-0 rounded-full border-4 border-solid border-indigo-600 dark:border-indigo-800"
                    :src="
                      error
                        ? 'https://via.placeholder.com/224?text=Picture+224x224'
                        : formatImageUrl(
                            identity.data.attributes.picture.data.attributes.url
                          )
                    "
                    :alt="
                      error
                        ? 'Photo de profil en 224*224 minimum, ratio de 1/1'
                        : identity.data.attributes.picture.data.attributes
                            .alternativeText
                    "
                  />
                </div>
              </div>
              <h3
                class="text-md mt-6 text-center font-bold text-gray-50 dark:text-slate-50"
              >
                {{ error ? 'FirstName' : identity.data.attributes.first_name }}
                {{ error ? 'LastName' : identity.data.attributes.last_name }}
              </h3>
              <dl class="mt-1 flex flex-grow flex-col justify-between">
                <!--                <dt class="sr-only">Title</dt>-->
                <dd
                  class="text-md text-center font-semibold text-gray-100 dark:text-slate-100"
                >
                  {{ error ? 'JobTitle' : identity.data.attributes.job }}
                </dd>
                <!--                <dt class="sr-only">Role</dt>-->
                <dd class="mt-4 flex flex-wrap justify-center">
                  <span
                    v-for="skill in error
                      ? [
                          { id: 1, quality: 'Quality' },
                          { id: 2, quality: 'Quality' },
                          { id: 3, quality: 'Quality' },
                          { id: 4, quality: 'Quality' },
                          { id: 5, quality: 'Quality' },
                        ]
                      : identity.data.attributes.soft_skills"
                    :key="skill.id"
                    class="mx-1 mt-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-purple-500 dark:text-slate-100"
                    >{{ skill.quality }}</span
                  >
                </dd>
              </dl>
            </div>
          </div>
          <nav class="mt-5 flex-1 space-y-1 px-2">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-indigo-800 text-gray-50 dark:bg-indigo-900 dark:text-slate-50'
                  : 'text-gray-100 hover:bg-indigo-600 hover:bg-opacity-75 dark:text-slate-100 dark:hover:bg-indigo-800',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300 dark:text-indigo-500"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>
          </nav>
        </div>
        <div
          class="flex flex-shrink-0 justify-center border-t border-indigo-800 p-4"
        >
          <div class="mt-0">
            <p class="text-center text-xs leading-6 text-gray-300">
              © 2022 Thibaut SANJUAN.
            </p>
            <p class="text-center text-xs leading-6 text-gray-300">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="sticky top-0 z-40 flex justify-between bg-gray-100 dark:bg-slate-800 md:hidden"
    >
      <button
        type="button"
        class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-slate-500 dark:hover:text-slate-300"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div
        class="mr-2 flex flex-col items-end justify-center text-right text-xs text-gray-500 dark:text-slate-500"
      >
        <div>
          {{ error ? 'FirstName' : identity.data.attributes.first_name }}
          {{ error ? 'LastName' : identity.data.attributes.last_name }}
        </div>
        <div>{{ error ? 'JobTitle' : identity.data.attributes.job }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import {
  BeakerIcon,
  SwatchIcon,
  HomeIcon,
  BuildingLibraryIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { useFetch, useRuntimeConfig } from 'nuxt/app'
const config = useRuntimeConfig()

const navigation = [
  { name: 'Accueil', href: '#home', icon: HomeIcon, current: true },
  { name: 'À propos', href: '#about-me', icon: UserIcon, current: false },
  { name: 'Compétences', href: '#skills', icon: BeakerIcon, current: false },
  {
    name: 'Expériences',
    href: '#professionnal-experiences',
    icon: BuildingOfficeIcon,
    current: false,
  },
  {
    name: 'Formations',
    href: '#education-and-training',
    icon: BuildingLibraryIcon,
    current: false,
  },
  {
    name: 'Portfolio',
    href: '#portfolio',
    icon: SwatchIcon,
    current: false,
  },
  { name: 'Contact', href: '#contact', icon: EnvelopeIcon, current: false },
]

const sidebarOpen = ref(false)

const { data: identity, error } = await useFetch(
  `${config.public.strapiUrl}/api/identity?populate=*`
)

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
</script>

<style scoped></style>
