<script>
export default {
  name: 'SignUpForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|email|min:3|max:100',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:3|max:100|excluded:password',
        confirmPassword: 'required|passwords_mismatch:@password',
        country: 'required',
        tos: 'required'
      },
      userData: {
        country: 'USA'
      },
      registrationInSubmission: false,
      regShowAlert: false,
      reg_variant_blue: 'bg-blue-500',
      reg_message: 'Please wait, your account is being created'
    }
  },
  methods: {
    register(values) {
      this.registrationInSubmission = true
      this.regShowAlert = true
      this.reg_variant_blue = 'bg-blue-500'
      this.reg_message = 'Please waith, your account is being created'

      this.reg_variant_blue = 'bg-green-500'
      this.reg_message = 'Success! Your acount has been created'

      console.log('values', values)
    }
  }
}
</script>

<template>
  <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
    <div
      class="text-white text-center font-bold p04 rounded mb-4"
      v-if="regShowAlert"
      :class="reg_variant_blue"
    >
      {{ reg_message }}
    </div>
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="name">Name</label>
      <vee-field
        name="name"
        id="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <error-message class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="rEmail">Email</label>
      <vee-field
        name="email"
        id="rEmail"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="age">Age</label>
      <vee-field
        name="age"
        id="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <error-message class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="rPassword">Password</label>
      <vee-field name="password" id="rPassword" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          placeholder="Password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error"></div>
      </vee-field>
      <error-message class="text-red-600" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="crPassword">Confirm Password</label>
      <vee-field
        name="confirmPassword"
        id="crPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <error-message class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="country">Country</label>
      <vee-field
        as="select"
        name="country"
        id="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </vee-field>
      <error-message class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        id="accept"
        value="1"
      />
      <label class="inline-block" for="accept">Accept terms of service</label>
    </div>
    <error-message class="text-red-600" name="tos" />
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="registrationInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>