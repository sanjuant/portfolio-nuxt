<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    id="about-me"
    class="divider overflow-hidden bg-gray-50 py-12 text-gray-500 dark:bg-slate-800 dark:text-slate-200 lg:py-16"
  >
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-prose lg:max-w-none">
        <p
          class="font-semibold uppercase leading-6 tracking-wide text-indigo-600 dark:text-indigo-500"
        >
          A propos de moi
        </p>
        <h1
          class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl sm:leading-10"
        >
          Bonjour, je suis
          <span class="text-indigo-600">{{
            error ? 'FirstName LastName' : aboutMe.data.attributes.title
          }}</span
          >,
        </h1>
      </div>
      <div
        class="relative z-10 mx-auto mb-8 max-w-prose lg:mx-0 lg:max-w-5xl lg:pr-72"
      >
        <p class="text-justify text-lg leading-7">
          {{
            error
              ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare dictum semper. Nunc condimentum, metus id sollicitudin ultrices, quam metus convallis eros, sit amet pulvinar leo justo vitae nibh. Maecenas ut diam tempus, congue lorem quis dapibus nam. '
              : aboutMe.data.attributes.summary
          }}
        </p>
      </div>
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
        <div class="relative z-10 mb-32 sm:mb-28 lg:mb-0">
          <div
            class="prose prose-headings:mt-0 prose-headings:text-gray-900 dark:prose-headings:text-slate-100 mx-auto mb-10 text-justify text-gray-500 dark:text-slate-200 lg:max-w-none"
            v-html="
              error
                ? 'Data cannot be retrieved'
                : aboutMe.data.attributes.content
            "
          ></div>
        </div>
        <div class="relative mx-auto max-w-prose lg:max-w-none">
          <svg
            class="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  class="text-gray-200 dark:text-slate-500"
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  fill="currentColor"
                ></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
            ></rect>
          </svg>
          <blockquote
            class="relative rounded-lg bg-white shadow-lg dark:bg-slate-900"
          >
            <div class="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
              <div class="flex flex-row items-center">
                <img
                  v-if="
                    !error &&
                    !aboutMe.data.attributes.recommendation
                      .company_logo_is_colored
                  "
                  class="max-h-[3rem] dark:invert"
                  :src="`${config.public.strapiUrl}${aboutMe.data.attributes.recommendation.company_logo.data.attributes.url}`"
                  :alt="
                    aboutMe.data.attributes.recommendation.company_logo.data
                      .attributes.alternativeText
                  "
                />
                <img
                  v-else
                  class="max-h-[3rem]"
                  :src="
                    error
                      ? 'https://tailwindui.com/img/logos/v1/workcation-color.svg'
                      : `${config.public.strapiUrl}${aboutMe.data.attributes.recommendation.company_logo.data.attributes.url}`
                  "
                  :alt="
                    error
                      ? ''
                      : aboutMe.data.attributes.recommendation.company_logo.data
                          .attributes.alternativeText
                  "
                />
                <div
                  v-if="
                    !error &&
                    aboutMe.data.attributes.recommendation.company_title !== ''
                  "
                  class="ml-4 text-3xl font-bold text-gray-900 dark:text-slate-100"
                  v-html="aboutMe.data.attributes.recommendation.company_title"
                ></div>
              </div>
              <div
                class="relative mt-8 text-lg font-medium leading-7 text-gray-700 dark:text-slate-200"
              >
                <svg
                  class="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-gray-200 dark:text-slate-500"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                  ></path>
                </svg>
                <p class="relative">
                  {{
                    error
                      ? 'Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam. Montes, magna cursus nulla feugiat dignissim id lobortis amet. Laoreet sem est phasellus eu proin massa, lectus.'
                      : aboutMe.data.attributes.recommendation.message
                  }}
                </p>
              </div>
            </div>
            <cite
              class="flex items-center rounded-b-lg bg-indigo-600 py-5 px-6 not-italic dark:bg-indigo-900 sm:mt-10 sm:items-start sm:py-5 sm:pl-12 sm:pr-10"
            >
              <span
                class="mr-4 rounded-full border-2 border-white dark:border-black sm:-mt-[3.75rem] sm:mr-6"
              >
                <img
                  class="h-12 w-12 max-w-none rounded-full bg-indigo-300 dark:bg-indigo-600 sm:h-20 sm:w-20"
                  :src="
                    error
                      ? 'https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2.5&amp;w=160&amp;h=160&amp;q=80'
                      : `${config.public.strapiUrl}${aboutMe.data.attributes.recommendation.picture.data.attributes.url}`
                  "
                  :alt="
                    error
                      ? ''
                      : aboutMe.data.attributes.recommendation.picture.data
                          .attributes.alternativeText
                  "
                />
              </span>
              <span
                class="font-semibold leading-6 text-indigo-200 dark:text-indigo-300"
              >
                <strong
                  class="mr-1 font-semibold text-gray-50 dark:text-slate-100"
                  >{{
                    error
                      ? 'John Doe'
                      : aboutMe.data.attributes.recommendation.author
                  }}</strong
                >
                <br class="sm:hidden lg:block xl:hidden" /><span
                  >{{
                    error
                      ? 'Job'
                      : aboutMe.data.attributes.recommendation.company_job
                  }}
                  at
                  {{
                    error
                      ? 'Company'
                      : aboutMe.data.attributes.recommendation.company_name
                  }}</span
                >
              </span>
            </cite>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFetch, useRuntimeConfig } from 'nuxt/app'
const config = useRuntimeConfig()

const { data: aboutMe, error } = await useFetch(
  `${config.public.strapiUrl}/api/about-me?populate=deep`
)
</script>

<style scoped></style>
