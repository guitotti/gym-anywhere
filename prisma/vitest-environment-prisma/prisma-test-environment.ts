export default {
  name: 'prisma',
  async setup() {
    console.log('Setup')

    return {
      teardown() {
        console.log('Teardown')
      },
    }
  },
  transformMode: 'ssr',
}
