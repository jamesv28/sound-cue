<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email|min:3|max:100',
        password: 'required|min:3|max:100'
      },
      loginInSubmissions: false,
      loginShowAlert: false,
      login_variant_color: 'bg-blue-500',
      login_message: 'Please wait, we are logging you in'
    }
  },
  methods: {
    login(values) {
      console.log(values)
      this.loginInSubmissions = true
      this.loginShowAlert = true
      this.login_variant_color = 'bg-blue-600'
      this.login_message = 'Please wait, you are being logged in'

      this.login_variant_color = 'bg-green-500'
      this.login_message = 'Succes! you are logged in'
    }
  }
}
</script>

<template>
  <div
    class="text-white text-center font-bold p04 rounded mb-4"
    v-if="loginShowAlert"
    :class="login_variant_color"
  >
    {{ login_message }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="lEmail">Email</label>
      <vee-field
        name="email"
        id="lEmail"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="lPassword">Password</label>
      <vee-field
        name="password"
        id="lPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <error-message class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="loginInSubmissions"
    >
      Submit
    </button>
  </vee-form>
</template>