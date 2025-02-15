<template>
  <div class="col-lg-9 col-md-9 profile-content">
    <div class="profile-information-form">
      <h4 class="information-form-title">Lične informacije</h4>
      <div class="information-form-container form-top">
        <input
          type="text"
          v-model="user.name"
          class="information-form-input input-col"
          placeholder="Ime"
          autocomplete="off"
        />
        <span
          class="text-danger text-xs"
          v-show="validateField('user', 'name')"
        >This field is invalid</span>
        <input
          type="email"
          v-model="user.email"
          class="information-form-input input-col"
          placeholder="Email"
          autocomplete="off"
        />
        <span
          class="text-danger text-xs"
          v-show="validateField('user', 'email')"
        >This field is invalid</span>
        <input
          type="tel"
          v-model="user.phone_number"
          class="information-form-input input-col"
          placeholder="Broj telefona"
          autocomplete="off"
        />
      </div>
      <h4 class="information-form-title">Promeni šifru</h4>
      <div class="information-form-container form-bottom">
        <input
          type="password"
          v-model="passwordForm.newPassword"
          class="information-form-input input-col"
          placeholder="Nova šifra"
          autocomplete="off"
        />
        <input
          type="password"
          v-model="passwordForm.confirmPassword"
          class="information-form-input input-col"
          placeholder="Potvrdi šifru"
          autocomplete="off"
        />
        <button class="information-form-btn" @click="submitForm">Sačuvaj</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { API } from "../../helpers/api";

import { profileValidations } from "../../static/user/profile";

export default {
  name: "ProfileForm",
  props: {
    currentUser: {
      type: Object
    }
  },
  data() {
    return {
      user: {},
      passwordForm: {
        newPassword: "",
        confirmPassword: ""
      },
      API
    };
  },
  validations: profileValidations,
  methods: {
    updateUser() {
      //Assemble user data
      this.assembleUser();

      let requestUrl = this.API.user.editProfile;

      let requestParams = this.user;

      axios
        .put(requestUrl, requestParams)
        .then(response => {
          if (response.data === "success") {
            this.showNotification(
              "success",
              "Tvoj profil je uspešno ažuriran."
            );
          }
        })
        .catch(error => {
          this.showNotification("error", "Desila se greška. Pokušaj ponovo.");
        });
    },
    assembleUser() {
      let passwordForm = this.passwordForm;

      if (
        passwordForm.newPassword !== "" &&
        passwordForm.confirmPassword !== ""
      ) {
        let user = this.user;

        user.password = passwordForm.newPassword;
      }
    },
    setFormData() {
      this.user = this.currentUser;
    },
    submitForm() {
      if (!this.$v.$invalid) {
        this.updateUser();
      } else {
        this.showNotification(
          "error",
          "Molimo te da popuniš sva zahtevana polja i pokušaš ponovo."
        );
      }
    }
  },
  mounted() {
    //Set form data
    this.setFormData();
  }
};
</script>