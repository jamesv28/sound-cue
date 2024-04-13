<script>
import { mapState, mapWritableState } from 'pinia'
import { useModalStore } from '@/stores/modals'

export default {
  name: 'AuthModal',
  data() {
    return {
      tab: 'login',
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
  },
  computed: {
    ...mapState(useModalStore, ['hiddenClass']),
    ...mapWritableState(useModalStore, {
      modalVisibility: 'isOpen'
    })
  }
}
</script>

<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="{ hidden: hiddenClass }">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="modalVisibility = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="
                  tab === 'login'
                    ? 'hover:text-white text-white bg-blue-600'
                    : 'hover:text-blue-600'
                "
                href="#"
                @click.prevent="tab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="
                  tab === 'register'
                    ? 'hover:text-white text-white bg-blue-600'
                    : 'hover:text-blue-600'
                "
                href="#"
                @click.prevent="tab = 'register'"
                >Register</a
              >
            </li>
          </ul>

          <!-- Login Form -->
          <form v-if="tab == 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="lEmail">Email</label>
              <input
                id="lEmail"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="lPassword">Password</label>
              <input
                id="lPassword"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            >
              Submit
            </button>
          </form>
          <!-- Registration Form -->

          <vee-form
            v-else
            :validation-schema="schema"
            @submit="register"
            :initial-values="userData"
          >
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
        </div>
      </div>
    </div>
  </div>
</template>