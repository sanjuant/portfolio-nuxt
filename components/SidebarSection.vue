<template>
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
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75"/>
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
        <div class="relative flex flex-col bg-indigo-700 w-64">
          <div class="flex-1 overflow-y-auto pt-5 pb-4">
            <div class="flex items-center">
              <div class="flex flex-1 flex-col px-4">
                <div class="flex items-center justify-center">
                  <div class="relative">
                      <span
                          class="absolute top-0 right-0 z-10 h-[3.5rem] w-[3.5rem] rounded-full border-4 border-indigo-600 bg-green-100"
                      />
                    <span
                        class="absolute -top-2 -right-2 h-[15rem] w-[15rem] rounded-full border-4 border-indigo-600 bg-green-100"
                    />
                    <img
                        class="relative mx-auto h-[224px] w-[224px] flex-shrink-0 rounded-full border-4 border-solid border-indigo-600"
                        :src="person.imageUrl"
                        alt=""
                    />
                  </div>
                </div>
                <h3
                    class="mt-6 text-center text-md font-bold font-medium text-gray-50"
                >
                  {{ person.name }}
                </h3>
                <dl class="mt-1 flex flex-grow flex-col justify-between">
                  <!--                    <dt class="sr-only">Title</dt>-->
                  <dd class="text-center text-md font-semibold text-gray-100">
                    {{ person.title }}
                  </dd>
                  <!--                    <dt class="sr-only">Role</dt>-->
                  <dd class="mt-4 flex flex-wrap justify-center">
                      <span
                          v-for="tag in person.tags"
                          :key="tag"
                          class="mx-1 mt-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                      >{{ tag }}</span
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
                      ? 'bg-indigo-800 text-white'
                      : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                    'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                  ]"
              >
                <component
                    :is="item.icon"
                    class="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
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
              <p class="leading-6 text-center text-xs text-gray-300">
                © 2022 Thibaut SANJUAN.
              </p>
              <p class="leading-6 text-center text-xs text-gray-300">
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
                <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true"/>
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
      class="z-30 hidden drop-shadow-[0_10px_5px_rgba(0,0,0,0.25)] md:fixed md:inset-y-0 md:flex w-64 md:flex-col"
  >
    <div
        class="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-indigo-600 to-indigo-700"
    >
      <div class="flex-1 overflow-y-auto pt-5 pb-4">
        <div class="flex items-center">
          <div class="flex flex-1 flex-col px-4">
            <div class="flex items-center justify-center">
              <div class="relative">
                  <span
                      class="absolute top-0 right-0 z-10 h-[3.5rem] w-[3.5rem] rounded-full border-4 border-indigo-600 bg-green-100"
                  />
                <span
                    class="absolute -top-2 -right-2 h-[15rem] w-[15rem] rounded-full border-4 border-indigo-600 bg-green-100"
                />
                <img
                    class="relative mx-auto flex-shrink-0 rounded-full border-4 border-solid border-indigo-600"
                    :src="person.imageUrl"
                    alt=""
                />
              </div>
            </div>
            <h3
                class="mt-6 text-center text-md font-bold font-medium text-gray-50"
            >
              {{ person.name }}
            </h3>
            <dl class="mt-1 flex flex-grow flex-col justify-between">
              <!--                <dt class="sr-only">Title</dt>-->
              <dd class="text-center text-md font-semibold text-gray-100">
                {{ person.title }}
              </dd>
              <!--                <dt class="sr-only">Role</dt>-->
              <dd class="mt-4 flex flex-wrap justify-center">
                  <span
                      v-for="tag in person.tags"
                      :key="tag"
                      class="mx-1 mt-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                  >{{ tag }}</span
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
                  ? 'bg-indigo-800 text-white'
                  : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
          >
            <component
                :is="item.icon"
                class="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
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
          <p class="leading-6 text-center text-xs text-gray-300">
            © 2022 Thibaut SANJUAN.
          </p>
          <p class="leading-6 text-center text-xs text-gray-300">
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
      class="sticky top-0 z-40 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden"
  >
    <button
        type="button"
        class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        @click="sidebarOpen = true"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup>
import {ref} from "vue";

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

const navigation = [
  {name: 'Accueil', href: '#home', icon: HomeIcon, current: true},
  {name: 'À propos', href: '#about-me', icon: UserIcon, current: false},
  {name: 'Compétences', href: '#skills', icon: BeakerIcon, current: false},
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
  {name: 'Contact', href: '#contact', icon: EnvelopeIcon, current: false},
]
const person = {
  name: 'Thibaut SANJUAN',
  title: 'Ingénieur en Cybersécurité et Développeur Full Stack',
  tags: ['Courtois', 'Test', 'Diplomate', 'Appliqué', "Esprit d'équipe"],
  email: 'toto@example.com',
  telephone: '+1-202-555-0170',
  imageUrl:
      'https://cdn.discordapp.com/attachments/304686654202052618/931713734135676928/profile-pic.png',
}
const sidebarOpen = ref(false)

const { data: identity } = await useFetch('http://strapi.sanjuant.local/api/identity', { pick: ['first_name', 'last_name'] })

console.log(identity)
</script>

<style scoped>

</style>