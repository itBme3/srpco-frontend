<template>
  <div class="form">
    <form-schema
      ref="form"
      v-model="model"
      :schema="schema"
      @submit.prevent="submit"
    >
      <gButton type="primary" @click="submit">
        Subscribe
      </gButton>
    </form-schema>
  </div>
</template>

<script>
import FormSchema from 'vue-json-schema'
import { TInput, TTag, TCheckbox, TRadio, TSelect, TToggle, TButton } from 'vue-tailwind/dist/components'
import FormWrapper from '~/components/FormWrapper.vue'
FormSchema.setComponent('form', FormWrapper, (vm) => {
  // vm is the FormSchema VM
  console.log({ vm })
  const labelWidth = '120px'
  const model = vm.data
  const rules = {}

  vm?.fields?.forEach((field) => {
    rules[field.name] = {
      required: field.required,
      message: field.title
    }
  })

  return { labelWidth, rules, model }
})

// Use `FormSchema.setComponent(type, component[, props = {}])` to define custom element to use for rendering.
FormSchema.setComponent('label', TTag)
FormSchema.setComponent('email', TInput)
FormSchema.setComponent('text', TInput)
FormSchema.setComponent('textarea', TInput)
FormSchema.setComponent('checkbox', TCheckbox)
FormSchema.setComponent('checkbox', TToggle)
FormSchema.setComponent('radio', TRadio)
FormSchema.setComponent('select', TSelect)
FormSchema.setComponent('option', TButton)

export default {
  components: { FormSchema },
  data: () => ({
    schema: require('~/form-schema/general'),
    model: {}
  }),
  methods: {
    submit (e) {
      console.log(JSON.stringify(this.model))
      console.log({ e })
    }
  }
}
</script>
