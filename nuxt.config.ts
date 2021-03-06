// const OGP_URL = BASE_URL + 'ogp/'

import { IContentDocument } from '@nuxt/content/types/content'
require('dotenv').config()
const BASE_HOST = process.env.BASE_HOST || 'http://localhost'
const BASE_URL = BASE_HOST + '/'
const BASE_OGP = BASE_URL + 'img/ogp/'

const config = {
  ssr: true,
  target: 'static',
  /*
   ** Src directory
   */
  // srcDir: 'src',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
    title: 'kappy tech blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          process.env.npm_package_description ||
          '主にVue.jsやNuxt.js、電子工作について勉強した内容や得た知見をメモしたり共有するブログです。',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'kappy tech blog',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      { hid: 'og:url', property: 'og:url', content: BASE_URL },
      { hid: 'og:title', property: 'og:title', content: 'kappy tech blog' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '主にVue.jsやNuxt.js、電子工作について勉強した内容や得た知見をメモしたり共有するブログです。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${BASE_OGP}home.png`,
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/global.css', '@/assets/css/content.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/scrollactive.ts', ssr: false },
    { src: '~/plugins/font-awesome', ssr: false },
    { src: '~plugins/ga.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics',
    '@aceforth/nuxt-optimized-images',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/feed',
    'nuxt-fontawesome',
    'vue-social-sharing/nuxt',
  ],
  env: {
    BASE_HOST,
    BASE_OGP,
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-a11y-dark.css',
      },
    },
  },
  feed() {
    const feedFormats = {
      rss: { type: 'rss2', file: 'rss.xml' },
      atom: { type: 'atom1', file: 'atom.xml' },
      json: { type: 'json1', file: 'feed.json' },
    }
    const { $content } = require('@nuxt/content')
    const createFeedArticles = async function (feed: any) {
      feed.options = {
        title: 'kappy tech blog',
        description:
          '主にVue.jsやNuxt.js、電子工作について勉強した内容や得た知見をメモしたり共有するブログです。',
        link: BASE_URL,
      }
      const articles: IContentDocument[] = await $content('').fetch()
      articles.forEach((article) => {
        const url = `${BASE_URL}${article.slug}/`
        feed.addItem({
          title: article.title,
          id: url,
          link: url,
          date: new Date(article.createdAt),
          description: article.description,
          content: article.description,
          author: 'kp047i',
        })
      })
    }
    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `${file}`,
      type,
      create: createFeedArticles,
    }))
  },
  fontawesome: {
    component: 'fa',
  },
  googleAnalytics: {
    id: 'UA-138249132-2',
  },
  optimizedImages: {
    // モジュールのオプション
    optimizeImages: true,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}

export default config
