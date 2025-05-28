<template>
    <div>
        <section
            v-if="products.length"
            class="checkout-page"
        >
            <!-- Cart Page Top -->
            <section class="cart-content container">
                <!--<div class="row">
                                    <div class="col-lg-12 cart-order-title">
                                        <h2 class="order-title">
                                            Odjava
                                        </h2>
                                    </div>
                                </div>-->
                <div class="row">
                    <div class="col-lg-9">
                        <div class="cart-product-list">
                            <div class="product-list-col-1 product-list-title">
                                Naziv ponude
                            </div>
                            <div class="product-list-col-2 product-list-title">
                                Cena
                            </div>
                            <div class="product-list-col-3 product-list-title">
                                Količina
                            </div>
                            <div class="product-list-col-4 product-list-title">
                                Ukupna cena
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div
                            v-for="(product, index) in products"
                            :key="index"
                            class="cart-product-item"
                        >
                            <div class="cart-product-item-row">
                                <div
                                    class="product-item-col-1 product-list-item"
                                >
                                    <a :href="productUrl(product.slug)">
                                        <img
                                            :src="product.imageUrl"
                                            alt="@product.title"
                                            class="product-item-image"
                                        >
                                    </a>
                                    <div class="product-item-desc">
                                        <a :href="productUrl(product.slug)">
                                            <h4 class="product-item-title">
                                                {{ product.title }}
                                            </h4>
                                        </a>
                                        <!--                                        <label-->
                                        <!--                                            class="product-item-label product-item-add-box"-->
                                        <!--                                            :class="{-->
                                        <!--                                                selected: product.add_box,-->
                                        <!--                                            }"-->
                                        <!--                                        >-->
                                        <!--                                            <input-->
                                        <!--                                                v-model="product.add_box"-->
                                        <!--                                                type="checkbox"-->
                                        <!--                                                class="product-item-checkbox"-->
                                        <!--                                                @change="toggleBox(index)"-->
                                        <!--                                            />-->
                                        <!--                                            <span class="product-item-check"/>-->
                                        <!--                                            Dodaj poklon kutiju-->
                                        <!--                                        </label>-->
                                        <label class="product-item-label">
                                            <input
                                                v-model="
                          personalMessages.showForm
                        "
                                                type="checkbox"
                                                class="product-item-checkbox"
                                            >
                                            <span class="product-item-check"/>
                                            Dodaj poruku/čestitku
                                        </label>
                                    </div>
                                </div>
                                <div class="product-item-col-2">
                                    <div
                                        v-if="product.discountPrice === 0"
                                        class="product-item-col-2_1 product-list-item-price"
                                    >
                                        <div class="price-regular">
                      <span class="item-price-number">{{
                              product.price
                          }}</span>
                                            <span class="item-price-currency">{{
                                                    selectedCurrency
                                                }}</span>
                                        </div>
                                    </div>
                                    <div
                                        v-else
                                        class="product-item-col-2_1 product-list-item-price sale"
                                    >
                                        <div class="price-regular">
                      <span class="item-price-number">{{
                              product.price
                          }}</span>
                                            <span class="item-price-currency">{{
                                                    selectedCurrency
                                                }}</span>
                                        </div>
                                        <div class="price-promo">
                      <span class="item-price-number">
                        {{
                              product.discountPrice
                          }}</span>
                                            <span class="item-price-currency">{{
                                                    selectedCurrency
                                                }}</span>
                                        </div>
                                    </div>
                                    <div
                                        class="product-item-col-2_2 product-counter product-list-item-counter"
                                    >
                                        <div class="item-counter-container">
                                            <button
                                                class="item-less"
                                                @click="
                          decrementQuantity(index)
                        "
                                            >
                                                &mdash;
                                            </button>
                                            <input
                                                type="text"
                                                class="item-counter"
                                                :value="product.quantity"
                                                readonly
                                            >
                                            <button
                                                class="item-more"
                                                @click="
                          incrementQuantity(index)
                        "
                                            >
                                                &#xff0b;
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        class="product-item-col-2_3 product-list-order-price"
                                    >
                                        <div>
                      <span class="order-price-number">{{
                              product.total
                          }}</span>
                                            <span
                                                class="order-price-currency"
                                            >{{ selectedCurrency }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-show="product.add_box"
                                class="cart-product-item-row product-box-row"
                            >
                                <div
                                    class="product-item-col-1 product-list-item"
                                >
                                    <div class="product-item-desc">
                                        <div class="box-item-info">
                                            <img
                                                src="/images/present-box-image-1.jpeg"
                                            >
                                            <p>Poklon kutija</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-item-col-2">
                                    <div
                                        class="product-item-col-2_1 product-list-item-price"
                                    >
                                        <div
                                            class="price-regular price-regular-box"
                                        >
                      <span class="item-price-number">{{
                              boxPrice
                          }}</span>
                                            <span class="item-price-currency">{{
                                                    selectedCurrency
                                                }}</span>
                                        </div>
                                    </div>
                                    <div
                                        class="product-item-col-2_2 product-counter product-list-item-counter"
                                    >
                                        <div
                                            class="item-counter-container box-counter-container"
                                        >
                                            <button
                                                class="item-less"
                                                @click="
                          decrementBoxQuantity(index)
                        "
                                            >
                                                &mdash;
                                            </button>
                                            <input
                                                type="text"
                                                class="item-counter"
                                                :value="product.box_count"
                                                readonly
                                            >
                                            <button
                                                class="item-more"
                                                @click="
                          incrementBoxQuantity(index)
                        "
                                            >
                                                &#xff0b;
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        class="product-item-col-2_3 product-list-order-price"
                                    />
                                </div>
                            </div>
                            <div
                                v-show="personalMessages.showForm"
                                class="product-list-item-comment"
                            >
                                <p
                                    class="product-comment-label product-message-label"
                                >
                                    Dodaj poruku/čestitku
                                </p>
                                <div class="product-comment-number">
                                    <div
                                        v-for="(
                      item, index
                    ) in product.personalMessages"
                                        :key="index"
                                        class="comment-number-item"
                                        :class="{
                      'number-item-active':
                        index ===
                        personalMessages.activeIndex,
                    }"
                                        @click="changeActiveMessage(index)"
                                    >
                                        {{ getItemNumber(index) }}
                                    </div>
                                </div>
                                <div
                                    v-for="(
                    message, index
                  ) in product.personalMessages"
                                    v-show="
                    index === personalMessages.activeIndex
                  "
                                    :key="index"
                                    class="message-tab"
                                >
                                    <textarea-with-counter
                                        v-model="message.text"
                                        placeholder="Dodaj poruku"
                                        :limit="340"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 cart-order-total">
                        <div class="order-total-price">
              <span
                  class="order-total-price-text"
              >Ukupna cena:</span>
                            <span class="order-total-price-number">{{
                                    subtotal + " " + selectedCurrency
                                }}</span>
                        </div>
                        <div class="order-total-shipping">
              <span
                  class="order-total-shipping-text"
              >Troškovi poštarine:</span>
                            <span class="order-total-shipping-number">{{
                                    shippingMethod.cost + " " + selectedCurrency
                                }}</span>
                        </div>
                        <div
                            v-if="discount > 0"
                            class="order-total-price"
                        >
                            <span class="order-total-price-text">Popust:</span>
                            <span class="order-total-price-number">{{ discount + " " + selectedCurrency }}</span>
                        </div>
                        <div class="order-total-price">
              <span
                  class="order-total-price-text"
              >Ukupna cena:</span>
                            <span class="order-total-price-number">{{ totalPrice() + " " + selectedCurrency}}</span>
                        </div>
                        <div class="order-vat-notice">
              <span>Turistička agencija Republika 031 nije u sistemu
                PDV-a</span>
                        </div>
                    </div>
                    <div
                        v-if="!isLoginCheckout"
                        class="cart-type-tabs col-lg-9"
                    >
                        <div class="cart-login-btns-row">
                            <div
                                id="informacije"
                                class="cart-login-btn-container"
                            >
                                <button
                                    class="login-btn"
                                    @click="guestCheckout"
                                >
                                    Bez registracije
                                </button>
                            </div>
                            <div class="cart-login-btn-container">
                                <button
                                    class="login-btn"
                                    @click="openAuthModal('login')"
                                >
                                    Uloguj se
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="isGuestCheckout || isLoginCheckout"
                        class="col-lg-9 cart-order-active-code"
                    >
                        <h3 class="order-active-title">
                            Imate li kod za popust ili poklon karticu
                        </h3>
                        <div class="order-active-form">
                            <div class="order-active-checkbox">
                                <label class="product-item-label">
                                    <input
                                        v-model="coupon.selected"
                                        type="checkbox"
                                        class="product-item-checkbox"
                                    >
                                    <span class="product-item-check"/>
                                    Kod za popust
                                </label>
                                <label class="product-item-label">
                                    <input
                                        v-model="giftCard.selected"
                                        type="checkbox"
                                        class="product-item-checkbox"
                                    >
                                    <span class="product-item-check"/>
                                    Kod za gift card
                                </label>
                            </div>
                            <div
                                v-show="coupon.selected"
                                class="order-active-input"
                            >
                                <input
                                    v-model="coupon.code"
                                    type="text"
                                    class="order-active-input-text"
                                    placeholder="Kod za popust"
                                >
                                <button
                                    class="order-active-input-btn"
                                    @click="updateDiscount"
                                >
                                    Iskoristi
                                </button>
                            </div>
                            <div
                                v-show="giftCard.selected"
                                class="order-active-input"
                            >
                                <input
                                    v-model="giftCard.code"
                                    type="text"
                                    class="order-active-input-text"
                                    placeholder="Kod za gift card"
                                >
                                <button
                                    class="order-active-input-btn"
                                    @click="updateDiscount"
                                >
                                    Iskoristi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                v-if="isGuestCheckout || isLoginCheckout"
                class="cart-order-information container"
            >
                <div class="row">
                    <div class="cart-type-tabs col-lg-9">
                        <h3 class="cart-type-title">
                            Odaberite način dostave
                        </h3>
                        <div class="cart-type-tabs-row">
                            <button
                                v-for="(method, index) in shippingMethods"
                                v-if="showShippingMethod(method)"
                                id="defaultOpen"
                                :key="index"
                                class="type-tabs-item"
                                :class="{
                  'tabs-active':
                    shippingMethod.id === method.id,
                }"
                                @click="selectShippingMethod(method)"
                            >
                                <img
                                    v-if="method.image !== null"
                                    :src="method.image.url"
                                    alt="PosebanPoklon"
                                    class="type-tabs-icon"
                                >
                                <div class="type-tabs-btn">
                  <span class="type-tabs-btn-title">
                    {{ method.name }}
                  </span>
                                    <span class="type-tabs-btn-desc">
                    {{
                                            method.cost + " " + selectedCurrency
                                        }}
                  </span>
                                </div>
                            </button>
                        </div>
                        <div class="cart-type-tabs-content">
                            <div class="type-tabs-content tabs-email-container">
                                <div class="tabs-email-checkbox-row">
                                    <label class="tabs-email-checkbox">
                                        <input
                                            v-model="address.sendToPerson"
                                            type="radio"
                                            name="send-to-customer"
                                            :value="false"
                                            class="email-checkbox-input"
                                        >
                                        <span class="email-checkbox-check"/>
                                        <span class="email-checkbox-text">
                      Pošalji na moju adresu
                    </span>
                                    </label>
                                    <label class="tabs-email-checkbox">
                                        <input
                                            v-model="address.sendToPerson"
                                            type="radio"
                                            name="send-to-recepient"
                                            :value="true"
                                            class="email-checkbox-input"
                                        >
                                        <span class="email-checkbox-check"/>
                                        <span class="email-checkbox-text">
                      Pošalji na adresu primaoca
                    </span>
                                    </label>
                                </div>
                                <!--Virtual address -->
                                <div
                                    v-if="shippingMethod.virtual"
                                    class="tabs-email-form-container"
                                >
                                    <!--Send to the current customer-->
                                    <div
                                        v-if="!address.sendToPerson"
                                        class="tabs-email-form-wrapper"
                                    >
                                        <div class="tabs-email-form-row">
                                            <h3 class="tabs-post-title">
                                                Lični podaci:
                                            </h3>
                                            <div class="tabs-email-col-title">
                                                <div class="tabs-email-title">
                                                    Ime *
                                                </div>
                                                <div class="tabs-email-title">
                                                    Prezime *
                                                </div>
                                                <div class="tabs-email-title">
                                                    Broj telefona *
                                                </div>
                                                <div class="tabs-email-title">
                                                    Email *
                                                </div>
                                            </div>
                                            <div class="tabs-email-col">
                                                <ValidationObserver
                                                    ref="addressObserver"
                                                    v-slot="{ validate }"
                                                    tag="form"
                                                >
                                                    <validation-provider
                                                        v-slot="{
                              classes,
                              errors,
                            }"
                                                        name="name"
                                                        rules="required"
                                                    >
                                                        <input
                                                            v-model="
                                address.customer_name
                              "
                                                            type="text"
                                                            class="tabs-email-input"
                                                            :class="classes"
                                                            placeholder="Ime"
                                                        >
                                                    </validation-provider>
                                                    <validation-provider
                                                        v-slot="{
                              classes,
                              errors,
                            }"
                                                        name="surname"
                                                        rules="required"
                                                    >
                                                        <input
                                                            v-model="
                                address.customer_surname
                              "
                                                            type="text"
                                                            class="tabs-email-input"
                                                            :class="classes"
                                                            placeholder="Prezime"
                                                        >
                                                    </validation-provider>
                                                    <validation-provider
                                                        v-slot="{
                              classes,
                              errors,
                            }"
                                                        name="number"
                                                        :rules="
                              phoneValidationRule
                            "
                                                    >
                                                        <input
                                                            v-model="
                                address.customer_phone
                              "
                                                            type="text"
                                                            name="number"
                                                            class="tabs-email-input"
                                                            :class="classes"
                                                            placeholder="Broj telefona"
                                                        >
                                                    </validation-provider>
                                                    <validation-provider
                                                        v-slot="{
                              classes,
                              errors,
                            }"
                                                        name="email"
                                                        rules="required|email"
                                                    >
                                                        <input
                                                            v-model="
                                address.customer_email
                              "
                                                            type="text"
                                                            class="tabs-email-input"
                                                            :class="classes"
                                                            placeholder="Email"
                                                        >
                                                    </validation-provider>
                                                </ValidationObserver>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Send to another person-->
                                    <div
                                        v-if="address.sendToPerson"
                                        class="tabs-email-form-wrapper"
                                    >
                                        <ValidationObserver
                                            ref="addressObserver"
                                            v-slot="{ validate }"
                                        >
                                            <div class="tabs-email-form-row">
                                                <h3 class="tabs-post-title">
                                                    Lični podaci:
                                                </h3>
                                                <div
                                                    class="tabs-email-col-title"
                                                >
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Ime *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Prezime *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Broj telefona *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Email *
                                                    </div>
                                                </div>
                                                <div class="tabs-email-col">
                                                    <form>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="name"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_name
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Ime"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="surname"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_surname
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Prezime"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="number"
                                                            :rules="
                                phoneValidationRule
                              "
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_phone
                                "
                                                                type="text"
                                                                name="number"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Broj telefona"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="email"
                                                            rules="required|email"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_email
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Email"
                                                            >
                                                        </validation-provider>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="tabs-email-form-row">
                                                <h3 class="tabs-post-title">
                                                    Podaci primaoca:
                                                </h3>
                                                <div
                                                    class="tabs-email-col-title"
                                                >
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Email *
                                                    </div>
                                                </div>
                                                <div class="tabs-email-col">
                                                    <form action="">
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="email"
                                                            rules="required|email"
                                                        >
                                                            <input
                                                                v-model="
                                  address
                                    .recepient
                                    .customer_email
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Email"
                                                            >
                                                        </validation-provider>
                                                    </form>
                                                </div>
                                            </div>
                                        </ValidationObserver>
                                    </div>
                                </div>
                                <!--Physical-->
                                <div
                                    v-if="shippingMethod.virtual === false"
                                    class="tabs-email-form-container"
                                >
                                    <!--Send to the current customer-->
                                    <div
                                        v-if="!address.sendToPerson"
                                        class="tabs-email-form-wrapper"
                                    >
                                        <div
                                            v-if="
                        isLoginCheckout &&
                          applicationParams.user.addresses
                            .length
                      "
                                            class="tabs-email-form-row"
                                        >
                                            <h3 class="tabs-post-title">
                                                Izaberite adresu:
                                            </h3>
                                            <div class="tabs-email-form-row">
                                                <div
                                                    class="tabs-email-col-title"
                                                >
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Adrese
                                                    </div>
                                                </div>
                                                <div class="tabs-email-col">
                                                    <form>
                                                        <select
                                                            v-model="
                                selectedAddress
                              "
                                                            class="tabs-email-input"
                                                        >
                                                            <option
                                                                selected
                                                                value
                                                            >
                                                                Izaberite adresu
                                                            </option>
                                                            <option
                                                                v-for="(
                                  address,
                                  index
                                ) in applicationParams
                                  .user
                                  .addresses"
                                                                :key="index"
                                                                :value="address"
                                                            >
                                                                {{
                                                                    addressLabel(
                                                                        address
                                                                    )
                                                                }}
                                                            </option>
                                                        </select>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tabs-email-form-row">
                                            <h3 class="tabs-post-title">
                                                Lični podaci:
                                            </h3>
                                            <div class="tabs-email-form-row">
                                                <div
                                                    class="tabs-email-col-title"
                                                >
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Ime *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Prezime *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Broj telefona *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Email *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Ulica I broj *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Opis adrese *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Država *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Grad *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Poštanski broj *
                                                    </div>
                                                </div>
                                                <div class="tabs-email-col">
                                                    <ValidationObserver
                                                        ref="addressObserver"
                                                        v-slot="{ validate }"
                                                        tag="form"
                                                    >
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="name"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_name
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Ime"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="surname"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_surname
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Prezime"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="number"
                                                            :rules="
                                phoneValidationRule
                              "
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_phone
                                "
                                                                type="text"
                                                                name="number"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Broj telefona"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="email"
                                                            rules="required|email"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_email
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Email"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="address one"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.address_one
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Ulica I broj"
                                                            >
                                                        </validation-provider>
                                                        <input
                                                            v-model="
                                address.address_two
                              "
                                                            type="text"
                                                            class="tabs-email-input"
                                                            placeholder="Opis adrese"
                                                        >
                                                        <input
                                                            v-model="
                                address.country
                              "
                                                            type="text"
                                                            class="tabs-email-input"
                                                            :class="classes"
                                                        >
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="city"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.city
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Grad"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="zip code"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.zip_code
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Poštanski broj"
                                                            >
                                                        </validation-provider>
                                                    </ValidationObserver>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Send to another person-->
                                    <div
                                        v-if="address.sendToPerson"
                                        class="tabs-email-form-wrapper"
                                    >
                                        <ValidationObserver
                                            ref="addressObserver"
                                            v-slot="{ validate }"
                                        >
                                            <div class="tabs-email-form-row">
                                                <h3 class="tabs-post-title">
                                                    Lični podaci:
                                                </h3>
                                                <div
                                                    class="tabs-email-col-title"
                                                >
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Ime *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Prezime *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Broj telefona *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Email *
                                                    </div>
                                                </div>
                                                <div class="tabs-email-col">
                                                    <form action="">
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="name"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_name
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Ime"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="surname"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_surname
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Prezime"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="number"
                                                            :rules="
                                phoneValidationRule
                              "
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_phone
                                "
                                                                type="text"
                                                                name="number"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Broj telefona"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="email"
                                                            rules="required|email"
                                                        >
                                                            <input
                                                                v-model="
                                  address.customer_email
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Email"
                                                            >
                                                        </validation-provider>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="tabs-email-form-row">
                                                <h3 class="tabs-post-title">
                                                    Podaci primaoca:
                                                </h3>
                                                <div
                                                    class="tabs-email-col-title"
                                                >
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Ime *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Prezime *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Broj telefona *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Email *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Ulica I broj *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Opis adrese *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Država *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Grad *
                                                    </div>
                                                    <div
                                                        class="tabs-email-title"
                                                    >
                                                        Poštanski broj *
                                                    </div>
                                                </div>
                                                <div class="tabs-email-col">
                                                    <form>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="name"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address
                                    .recepient
                                    .customer_name
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Ime"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="surname"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address
                                    .recepient
                                    .customer_surname
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Prezime"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="number"
                                                            :rules="
                                phoneValidationRule
                              "
                                                        >
                                                            <input
                                                                v-model="
                                  address
                                    .recepient
                                    .customer_phone
                                "
                                                                type="text"
                                                                name="number"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Broj telefona"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="email"
                                                            rules="required|email"
                                                        >
                                                            <input
                                                                v-model="
                                  address
                                    .recepient
                                    .customer_email
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Email"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="address one"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.address_one
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Ulica I broj"
                                                            >
                                                        </validation-provider>
                                                        <input
                                                            v-model="
                                address.address_two
                              "
                                                            type="text"
                                                            class="tabs-email-input"
                                                            placeholder="Opis adrese"
                                                        >
                                                        <input
                                                            v-model="
                                address.country
                              "
                                                            type="text"
                                                            class="tabs-email-input"
                                                            :class="classes"
                                                        >
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="city"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.city
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Grad"
                                                            >
                                                        </validation-provider>
                                                        <validation-provider
                                                            v-slot="{
                                classes,
                                errors,
                              }"
                                                            name="zip code"
                                                            rules="required"
                                                        >
                                                            <input
                                                                v-model="
                                  address.zip_code
                                "
                                                                type="text"
                                                                class="tabs-email-input"
                                                                :class="classes"
                                                                placeholder="Poštanski broj"
                                                            >
                                                        </validation-provider>
                                                    </form>
                                                </div>
                                            </div>
                                        </ValidationObserver>
                                    </div>
                                </div>
                                <div class="tabs-email-form-wrapper">
                                    <div class="tabs-email-form-row">
                                        <div class="tabs-email-col-title">
                                            <div class="tabs-email-title">
                                                Napomene
                                            </div>
                                        </div>
                                        <div class="tabs-email-col">
                      <textarea
                          v-model="orderComment"
                          class="tabs-email-input tabs-email-textarea"
                          placeholder="Napomene"
                      />
                                        </div>
                                    </div>
                                </div>
                                <div class="tabs-email-checkbox-agree">
                                    <ValidationObserver
                                        ref="agreementsObserver"
                                        v-slot="{ validate }"
                                    >
                                        <form action="">
                                            <label class="tabs-email-label">
                                                <validation-provider
                                                    v-slot="{ classes, errors }"
                                                    name="privacyPolicy"
                                                    rules="required|truthy"
                                                >
                                                    <input
                                                        v-model="
                              agreements.privacyPolicy
                            "
                                                        type="checkbox"
                                                        class="tabs-email-checkbox"
                                                    >
                                                    <span
                                                        class="tabs-email-check"
                                                        :class="classes"
                                                    />
                                                    Slažem se sa
                                                    <a
                                                        href="https://posebanpoklon.rs/politika-privatnosti"
                                                        target="_blank"
                                                    >pravilima
                                                        privatnosti</a>.
                                                </validation-provider>
                                            </label>
                                            <label class="tabs-email-label">
                                                <validation-provider
                                                    v-slot="{ classes, errors }"
                                                    name="termsOfUse"
                                                    rules="required|truthy"
                                                >
                                                    <input
                                                        v-model="
                              agreements.termsOfUse
                            "
                                                        type="checkbox"
                                                        class="tabs-email-checkbox"
                                                    >
                                                    <span
                                                        class="tabs-email-check"
                                                        :class="classes"
                                                    />
                                                    Slažem se sa
                                                    <a
                                                        href="https://posebanpoklon.rs/uslovi-prodaje"
                                                        target="_blank"
                                                    >uslovima prodaje</a>.
                                                </validation-provider>
                                            </label>
                                        </form>
                                    </ValidationObserver>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-type-tabs col-lg-9">
                        <h3 class="cart-type-title">
                            Izaberi način plaćanja
                        </h3>
                        <div class="cart-payment-tabs-row">
                            <button
                                v-for="(method, index) in paymentMethods"
                                v-if="showPaymentMethod(method)"
                                id="defaultOpenPayment"
                                :key="index"
                                class="payment-tabs-item"
                                :class="{
                  'tabs-active':
                    paymentMethod.id === method.id,
                }"
                                @click="selectPaymentMethod(method)"
                            >
                                <img
                                    v-if="method.image !== null"
                                    :src="method.image.url"
                                    alt="PosebanPoklon"
                                    class="type-tabs-icon"
                                >
                                <div class="type-tabs-btn">
                  <span class="type-tabs-btn-title">
                    {{ method.name }}
                  </span>
                                </div>
                            </button>
                        </div>
                        <div class="cart-payment-tabs-content">
                            <!--<div id="payment-a" class="payment-tabs-content tabs-cart-container">
                                                            <h3 class="cart-type-title">
                                                                Pojedinosti o kartici
                                                            </h3>
                                                            <div class="tabs-payment-form-row">
                                                                <div class="tabs-email-col-title">
                                                                    <img src="/images/icons/visa_cart_image.svg" alt="PosebanPoklon" class="tabs-payment-image">
                                                                </div>
                                                                <div class="tabs-payment-col">
                                                                    <form action="">
                                                                        <input type="text" name="" id="" class="tabs-payment-input payment-input-full"
                                                                               placeholder="Cart Holder">
                                                                        <input type="text" name="" id="" class="tabs-payment-input payment-input-full"
                                                                               placeholder="Cart Number">
                                                                        <input type="text" name="" id="" class="tabs-payment-input payment-input-half"
                                                                               placeholder="Exp Date">
                                                                        <input type="text" name="" id="" class="tabs-payment-input payment-input-half"
                                                                               placeholder="CVV">
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div class="tabs-payment-btn-row">
                                                                <button class="tabs-payment-btn">Placanje</button>
                                                            </div>
                                                        </div>-->
                            <div
                                v-for="(method, index) in paymentMethods"
                                v-show="paymentMethod.id === method.id"
                                :key="index"
                                class="payment-tabs-content tabs-bank-container tabs-cart-content"
                            >
                                <!--<h3 class="tabs-bank-title">
                                                                    {{ method.name }}
                                                                </h3>
                                                                <p class="tabs-bank-desc">{{ method.description }}</p>-->
                                <div
                                    v-if="!isLocalhost()"
                                    class="tabs-payment-btn-row recaptcha-row"
                                >
                                    <vue-recaptcha
                                        v-if="!isLoggedIn"
                                        ref="reCaptcha"
                                        sitekey="6LccCIQcAAAAABVlESQ5bPVyS3k_MUwbGHi-vMfI"
                                        language="sr"
                                        :load-recaptcha-script="true"
                                        @verify="setCaptchaVerified"
                                        @expired="setCaptchaExpired"
                                    />
                                </div>

                                <div class="tabs-payment-btn-row">
                                    <form
                                        v-if="paymentParams && method.id === 3"
                                        id="payment-form"
                                        method="post"
                                        action="https://bib.eway2pay.com/fim/est3Dgate"
                                    >
                                        <input
                                            type="hidden"
                                            name="clientid"
                                            :value="paymentParams.clientid"
                                        >
                                        <input
                                            type="hidden"
                                            name="description"
                                            :value="paymentParams.description"
                                        >
                                        <input
                                            type="hidden"
                                            name="amount"
                                            :value="paymentParams.amount"
                                        >
                                        <input
                                            type="hidden"
                                            name="oid"
                                            :value="paymentParams.oid"
                                        >
                                        <input
                                            type="hidden"
                                            name="okUrl"
                                            :value="paymentParams.okUrl"
                                        >
                                        <input
                                            type="hidden"
                                            name="failUrl"
                                            :value="paymentParams.failUrl"
                                        >
                                        <input
                                            type="hidden"
                                            name="shopurl"
                                            :value="paymentParams.shopurl"
                                        >
                                        <input
                                            type="hidden"
                                            name="trantype"
                                            :value="paymentParams.trantype"
                                        >
                                        <input
                                            type="hidden"
                                            name="currency"
                                            :value="paymentParams.currency"
                                        >
                                        <input
                                            type="hidden"
                                            name="rnd"
                                            :value="paymentParams.rnd"
                                        >
                                        <input
                                            type="hidden"
                                            name="hash"
                                            :value="paymentParams.hash"
                                        >
                                        <input
                                            type="hidden"
                                            name="storetype"
                                            :value="paymentParams.storetype"
                                        >
                                        <input
                                            type="hidden"
                                            name="hashAlgorithm"
                                            :value="paymentParams.hashAlgorithm"
                                        >
                                        <input
                                            type="hidden"
                                            name="lang"
                                            :value="paymentParams.lang"
                                        >
                                        <input
                                            type="hidden"
                                            name="encoding"
                                            :value="paymentParams.encoding"
                                        >
                                    </form>
                                    <!-- <button
                                                                            class="tabs-payment-btn"
                                                                            @click="validateForm"
                                                                            v-show="!paymentParams"
                                                                        >
                                                                            Poruči1
                                                                        </button> -->
                                </div>
                                <div class="tabs-payment-btn-row">
                                    <button
                                        class="tabs-payment-btn"
                                        @click="validateForm"
                                    >
                                        Poruči
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bank-logo-row checkout">
                        <a
                            href="https://www.bancaintesa.rs/"
                            target="_blank"
                            class="bank-img"
                        >
                            <img src="/images/checkout/logo_intesa.png">
                        </a>
                        <img
                            class="bank-img"
                            src="/images/checkout/visa.png"
                        >
                        <img
                            class="bank-img"
                            src="/images/checkout/mastercard.png"
                        >
                        <img
                            class="bank-img"
                            src="/images/checkout/maestro.png"
                        >
                    </div>
                </div>
            </section>

            <!--Recommended products block-->
            <recommended-products title="PREPORUČUJEMO"/>
        </section>
    </div>
</template>

<script>
//Library for sending requests
import axios from "axios";

//Addresses
import {countries, phoneValidationRule,} from "../../static/address/structures";

//Validation
import {ValidationObserver, ValidationProvider, Validator,} from "vee-validate";
//Phone number input mask
import Inputmask from "inputmask";

//reCaptcha
import VueRecaptcha from "vue-recaptcha";

Validator.extend("truthy", {
    validate: (value) => !!value,
});

export default {
    name: "CheckoutPage",
    components: {ValidationProvider, ValidationObserver, VueRecaptcha},
    data() {
        return {
            type: "",
            products: [],
            personalMessages: {
                showForm: false,
                activeIndex: 0,
            },
            selectedCurrency: "",
            subtotal: "",
            total: 0,
            discount: "",
            paymentMethod: {},
            shippingMethod: {},
            coupon: {
                selected: false,
                code: "",
                validated: false,
            },
            giftCard: {
                selected: false,
                code: "",
                validated: false,
            },
            address: {
                sendToPerson: false,
                recepient: {},
                country: "Srbija",
            },
            selectedAddress: {},
            orderComment: "",
            agreements: {
                privacyPolicy: false,
                termsOfUse: false,
            },
            isCaptchaVerified: false,
            paymentMethods: [],
            shippingMethods: [],
            phoneValidationRule,
            countries,
            hasBox: false,
            boxPrice: 690,
            paymentParams: null,
        };
    },
    computed: {
        isGuestCheckout() {
            return this.type === "guest";
        },
        isLoginCheckout() {
            return this.applicationParams.user !== null;
        },
    },
    watch: {
        type: function (newVal, oldVal) {
            this.selectCheckoutType(newVal);
        },
        selectedAddress: function (newVal, oldVal) {
            this.selectAddress();
        },
        "address.sendToPerson": function (newVal, oldVal) {
            //this.phoneNumberMask();
        },
        subtotal: function (newVal, oldVal = 0) {
            this.handleSubtotalChange(newVal, oldVal);
        },
    },
    created() {
        window.addEventListener("load", this.onWindowLoad);
    },
    mounted() {
        this.setCheckoutData();
        this.calculateOrderPrice();
        this.listenEvents();
        this.clearLocationPath();
        this.setInitialCaptcha();
    },
    methods: {
        totalPrice() {
            let total =
                parseFloat(this.total) + parseFloat(this.shippingMethod.cost);
            if (total - parseFloat(this.discount) < 0) {
                total = 0;
            }
            return total < 0 ? 0 : total;
        },
        showShippingMethod(method) {
            if (method.id === 9 && this.hasBox) {
                return false;
            } else if (
                this.paymentMethod.id === 2 ||
                this.paymentMethod.id === 3
            ) {
                if (this.totalPrice() < 9900) {
                    if (method.id === 1 || method.id === 9) {
                        return true;
                    }

                    /*if(!method.is_free){

                        return true;

                    }*/
                } else if (this.totalPrice() >= 9900) {
                    if (method.id === 9 || method.id === 10) {
                        return true;
                    }
                }
            } else if (this.paymentMethod.id === 1) {
                if (method.id === 2 || method.id === 9) {
                    return true;
                }
            }
        },
        showPaymentMethod(method) {
            /*if(method.id === 1){

                if(this.shippingMethod.id === 2 || this.shippingMethod.id === 10){

                    return true;

                }

            }
            else{

                return true;

            }*/

            if (method.id === 1) {
                if (this.shippingMethod.id === 9) {
                    return false;
                } else {
                    return true;
                }
            } else if (method.id === 3) {
                return true; //CHANGE to true
            } else {
                return true;
            }
        },
        setCheckoutData() {
            let cart = JSON.parse(localStorage.getItem("cart"));

            this.products = cart.items;

            cart.items.forEach((item) => {
                if (item.box_count) {
                    this.hasBox = true;
                    return;
                }
            });

            this.selectedCurrency = cart.currency;

            this.subtotal = cart.subtotal;

            //Update product messages
            this.updateMessages();

            //Load payment methods
            this.getPaymentMethods();

            //Load shipping methods
            this.getShippingMethods();
        },
        incrementQuantity(index) {
            //Send event to cart
            this.EventBus.$emit("product-quantity-increment", index);
        },
        decrementQuantity(index) {
            //Send event to cart
            this.EventBus.$emit("product-quantity-decrement", index);
        },
        toggleBox(index) {
            //Send event to cart
            this.EventBus.$emit("product-toggle-box", {
                index: index,
                value: this.products[index].add_box,
            });
        },
        incrementBoxQuantity(index) {
            //Send event to cart
            this.EventBus.$emit("product-box-increment", index);
        },
        decrementBoxQuantity(index) {
            //Send event to cart
            this.EventBus.$emit("product-box-decrement", index);
        },
        checkSelectedBox() {
            let result = false;

            for (var i = 0; i < this.products.length; i++) {
                if (this.products[i].box_count > 0) {
                    result = true;
                    break;
                }
            }

            this.hasBox = result;
        },
        listenEvents() {
            this.EventBus.$on("products-updated", (products) => {
                this.updateProducts(products);

                this.calculateOrderPrice();
                this.checkSelectedBox();
            });
        },
        updateProducts(products) {
            this.products = products;

            this.updateMessages();
        },
        updateMessages() {
            let products = this.products;

            products.forEach(function (product) {
                //Identify whether to show messages form
                product.showMessagesForm = false;

                let messagesCount = product.personalMessages.length;

                if (messagesCount > 0) {
                    product.showMessagesForm = true;
                }

                let quantity = product.quantity;

                if (messagesCount < quantity) {
                    let messageModel = {
                        text: "",
                    };

                    let difference = quantity - messagesCount;

                    for (let i = 0; i < difference; i++) {
                        const message = Object.assign({}, messageModel);

                        product.personalMessages.push(message);
                    }
                } else if (messagesCount > quantity) {
                    let difference = messagesCount - quantity;

                    let startPosition = quantity;

                    product.personalMessages.splice(startPosition, difference);
                }
            });
        },
        getPaymentMethods() {
            let requestUrl = this.API.paymentMethod.list;

            axios.get(requestUrl).then((response) => {
                this.paymentMethods = response.data;

                this.paymentMethod = this.paymentMethods[0]; //CHANGE to 0
            });
        },
        getShippingMethods() {
            let requestUrl = this.API.shippingMethod.list;

            axios.get(requestUrl).then((response) => {
                this.shippingMethods = response.data;

                this.shippingMethods.forEach(function (method) {
                    method.virtual = false;
                    method.is_free = false;
                });

                let eVoucher = this.shippingMethods.find(function (method) {
                    return method.id === 9;
                });

                eVoucher.virtual = true;

                this.shippingMethod = eVoucher;

                let freeShipping = this.shippingMethods.find(function (method) {
                    return method.id === 10;
                }) ?? {};

                freeShipping.is_free = true;

                this.$nextTick(() => {
                    this.handleSubtotalChange();
                });
            });
        },
        buildOrderParams() {
            let orderParams = {
                order_items: [],
                coupon_code: "",
                giftcard_code: "",
            };

            let orderItems = [];

            this.products.forEach(function (product) {
                orderItems.push({
                    product_id: product.productId,
                    product_quantity: product.quantity,
                    personal_message: JSON.stringify(product.personalMessages),
                    box_count: product.box_count,
                    box_total: product.box_total,
                });
            });

            orderParams.order_items = orderItems;

            orderParams.coupon_code = this.coupon.code;

            orderParams.giftcard_code = this.giftCard.code;

            return orderParams;
        },
        calculateOrderPrice() {
            let requestUrl = this.API.order.calculate;
            let requestParams = this.buildOrderParams();

            axios.post(requestUrl, requestParams).then((response) => {
                this.subtotal = parseFloat(response.data.subtotal);
                this.discount = parseFloat(response.data.discount);
                this.total = parseFloat(response.data.total);
            });
        },
        selectPaymentMethod(method) {
            this.paymentMethod = Object.assign({}, method);
            if (this.paymentMethod.id === 1) {
                if (
                    this.shippingMethod.id === 1 ||
                    this.shippingMethod.id === 10
                ) {
                    let shippingMethod = this.shippingMethods.find((item) => {
                        return item.id === 2;
                    });

                    if (shippingMethod !== undefined) {
                        this.shippingMethod = Object.assign({}, shippingMethod);
                    }
                }
            } else if (
                this.paymentMethod.id === 2 ||
                this.paymentMethod.id === 3
            ) {
                if (this.shippingMethod.id === 2) {
                    let shippingMethod = null;
                    if (this.totalPrice() < 9900) {
                        shippingMethod = this.shippingMethods.find((item) => {
                            return item.id === 9;
                        });
                    } else if (this.totalPrice() >= 9900) {
                        shippingMethod = this.shippingMethods.find((item) => {
                            return item.id === 10;
                        });
                    }
                    if (
                        shippingMethod !== undefined &&
                        shippingMethod !== null
                    ) {
                        this.shippingMethod = Object.assign({}, shippingMethod);
                    }
                }
            }
        },
        selectShippingMethod(method) {
            if (this.paymentMethod.id === 1) {
                if (method.id !== 1 || method.id !== 10) {
                    let paymentMethod = this.paymentMethods.find(function (
                        item
                    ) {
                        return item.id === 2;
                    });

                    if (paymentMethod !== undefined) {
                        this.selectPaymentMethod(paymentMethod);
                    }
                }
            }

            this.shippingMethod = Object.assign({}, method);
        },
        handleSubtotalChange(newVal, oldVal) {
            if (this.totalPrice() >= 9900) {
                let freeShipping = this.shippingMethods.find(function (method) {
                    return method.id === 10;
                });

                if (freeShipping !== undefined) {
                    this.selectShippingMethod(freeShipping);
                }
            } else {
                let eVoucher = this.shippingMethods.find(function (method) {
                    return method.virtual === true;
                });

                if (eVoucher !== undefined && !this.hasBox) {
                    this.selectShippingMethod(eVoucher);
                } else {
                    const courierShipping = this.shippingMethods.find(
                        (item) => {
                            return item.id === 1;
                        }
                    );

                    if (
                        courierShipping &&
                        this.showShippingMethod(courierShipping)
                    ) {
                        this.selectShippingMethod(courierShipping);
                    } else {
                        const courierShippingExtra = this.shippingMethods.find(
                            (item) => {
                                return item.id === 2;
                            }
                        );
                        if (
                            courierShippingExtra &&
                            this.showShippingMethod(courierShippingExtra)
                        ) {
                            this.selectShippingMethod(courierShippingExtra);
                        }
                    }
                }
            }
        },
        updateDiscount() {
            this.calculateOrderPrice();
        },
        changeActiveMessage(index) {
            this.personalMessages.activeIndex = index;
        },
        getItemNumber(index) {
            return (index += 1);
        },
        placeOrder() {
            let order = this.buildOrderParams();

            //Address
            order.customer_name = this.address.customer_name;
            order.customer_surname = this.address.customer_surname;
            order.customer_email = this.address.customer_email;
            order.customer_phone = this.address.customer_phone;

            if (this.shippingMethod.virtual) {
                if (this.address.sendToPerson) {
                    if (this.address.recepient.customer_name !== undefined) {
                        order.rec_name = this.address.recepient.customer_name;
                    }
                    if (this.address.recepient.customer_surname !== undefined) {
                        order.rec_surname =
                            this.address.recepient.customer_surname;
                    }
                    if (this.address.recepient.customer_phone !== undefined) {
                        order.rec_phone = this.address.recepient.customer_phone;
                    }
                    if (this.address.recepient.customer_email !== undefined) {
                        order.rec_email = this.address.recepient.customer_email;
                    }
                } else {
                    order.rec_name = this.address.customer_name;
                    order.rec_surname = this.address.customer_surname;
                    order.rec_email = this.address.customer_email;
                    order.rec_phone = this.address.customer_phone;
                }
            } else {
                if (this.address.sendToPerson) {
                    if (this.address.recepient.customer_name !== undefined) {
                        order.rec_name = this.address.recepient.customer_name;
                    }
                    if (this.address.recepient.customer_surname !== undefined) {
                        order.rec_surname =
                            this.address.recepient.customer_surname;
                    }
                    if (this.address.recepient.customer_phone !== undefined) {
                        order.rec_phone = this.address.recepient.customer_phone;
                    }
                    if (this.address.recepient.customer_email !== undefined) {
                        order.rec_email = this.address.recepient.customer_email;
                    }
                    order.address_one = this.address.address_one;
                    order.address_two = this.address.address_two;
                    order.country = this.address.country;
                    order.city = this.address.city;
                    order.zip_code = this.address.zip_code;
                } else {
                    order.customer_name = this.address.customer_name;
                    order.customer_surname = this.address.customer_surname;
                    order.customer_email = this.address.customer_email;
                    order.customer_phone = this.address.customer_phone;
                    order.address_one = this.address.address_one;
                    order.address_two = this.address.address_two;
                    order.country = this.address.country;
                    order.city = this.address.city;
                    order.zip_code = this.address.zip_code;
                    order.rec_name = this.address.customer_name;
                    order.rec_surname = this.address.customer_surname;
                    order.rec_email = this.address.customer_email;
                    order.rec_phone = this.address.customer_phone;
                }
            }

            if (this.shippingMethod.virtual) {

                order.customer_name = this.address.customer_name;
                order.customer_surname = this.address.customer_surname;
                order.customer_email = this.address.customer_email;
                order.customer_phone = this.address.customer_phone;

            } else {

                if (this.address.sendToPerson) {

                    order.customer_name = this.address.recepient.customer_name;
                    order.customer_surname = this.address.recepient.customer_surname;
                    order.customer_email = this.address.customer_email;
                    order.customer_phone = this.address.recepient.customer_phone;
                    order.address_one = this.address.recepient.address_one;
                    order.address_two = this.address.recepient.address_two;
                    order.country = this.address.recepient.country;
                    order.city = this.address.recepient.city;
                    order.zip_code = this.address.recepient.zip_code;

                } else {

                    order.customer_name = this.address.customer_name;
                    order.customer_surname = this.address.customer_surname;
                    order.customer_email = this.address.customer_email;
                    order.customer_phone = this.address.customer_phone;
                    order.address_one = this.address.address_one;
                    order.address_two = this.address.address_two;
                    order.country = this.address.country;
                    order.city = this.address.city;
                    order.zip_code = this.address.zip_code;

                }

            }

            if (this.applicationParams?.user !== null) {
                order.user_id = this.applicationParams?.user?.id;
            }

            order.payment_method_id = this.paymentMethod.id;

            order.shipping_method_id = this.shippingMethod.id;

            order.comment = this.orderComment;

            order.user_agreements = JSON.stringify(this.agreements);

            let requestUrl = this.API.order.create;

            axios.post(requestUrl, order).then(response => {
                if (response.data === 'success') {
                    //Clear the cart
                    this.EventBus.$emit('order-placed', true);

                    //Redirect to order success page
                    this.redirectToUrl(this.API.order.success);

                } else if (response.data.payment_params) {
                    //Clear the cart
                    this.EventBus.$emit('order-placed', true);

                    //Redirect to order success page
                    this.redirectToUrl(this.API.order.success);
                    this.paymentParams = response.data.payment_params;
                    this.$nextTick(() => {
                        this.submitPayment();
                    });
                }
            }).catch(error => {
                this.$swal({
                    title: 'Desila se greška. Pokušaj ponovo.',
                    type: 'error'
                });

            });

        },
        async isFormValid() {
            let errors = [];
            const isAddressValid = await this.$refs.addressObserver.validate();
            const isAgreementsValid = await this.$refs.agreementsObserver.validate();
            // Check if we're in local development environment
            const isLocalhost = this.isLocalhost();

            if (!isAddressValid) {
                errors.push('address');
            }
            if (!isAgreementsValid) {
                errors.push('agreements');
            }
            if (!isLocalhost && !this.isCaptchaVerified) {
                errors.push('captcha');
            }

            return errors;
        },

        async validateForm() {
            const errors = await this.isFormValid()

            if (errors.length === 0) {
                this.placeOrder();
                return;
            }

            if (errors.includes('agreements')) {
                this.$swal({
                    title: 'Da biste završili kupovinu, prvo morate da prihvatite uslove kupovine i pravila privatnosti. Kliknite na polje za potvrdu.',
                    type: 'error'
                });
                return;
            }

            if (errors.includes('captcha')) {
                this.$swal({
                    title: 'Molimo vas označite polje za potvrdu captcha.',
                    type: 'error'
                });
                return;
            }

            this.$swal({
                title: 'Molimo te da popuniš sva zahtevana polja i pokušaš ponovo.',
                type: 'error'
            });
        },
        setCaptchaVerified(value) {
            this.isCaptchaVerified = true;
        },
        setCaptchaExpired(value) {
            this.isCaptchaVerified = false;
        },
        setInitialCaptcha() {
            if (this.isLoggedIn) {
                this.isCaptchaVerified = true;
            }
        },
        submitPayment() {
            const form = document.getElementById("payment-form");
            if (form) {
                //Clear the cart
                this.EventBus.$emit("order-placed", true);
                //Submit the form
                form.submit();
            }
        },
        selectCheckoutType(type) {
            if (type === "login") {
                //Show login form
                // console.log("login form");
            }
        },
        guestCheckout() {
            this.type = "guest";

            location.hash = "#informacije";
        },
        clearLocationPath() {
            let locationString = location.hash;

            if (locationString !== "") {
                window.history.pushState("", "", "/checkout");
            }
        },
        addressLabel(address) {
            return (
                address.first_name +
                " " +
                address.last_name +
                ", " +
                address.address_one +
                ", " +
                address.city +
                "," +
                address.country
            );
        },
        selectAddress() {
            let checkoutAddress = this.address;
            let address = this.selectedAddress;
            let userEmail = this.applicationParams.user.email;

            checkoutAddress.customer_name = address.first_name;
            checkoutAddress.customer_surname = address.last_name;
            checkoutAddress.customer_email = userEmail;
            checkoutAddress.address_one = address.address_one;
            checkoutAddress.address_two = address.address_two;
            checkoutAddress.country = address.country;
            checkoutAddress.city = address.city;
            checkoutAddress.zip_code = address.post_code;
        },
        productUrl(slug) {
            return this.API.product.show + slug;
        },
        isLocalhost() {
            return typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.includes('localhost');
        },
        phoneNumberMask() {
            let im = new Inputmask("+999999999999");

            let elements = document.getElementsByName("number");

            elements.forEach(function (element) {
                im.mask(element);
            });
        },
        onWindowLoad() {
            //this.phoneNumberMask();
        },
    },
};
</script>

<style lang="scss">
.tabs-email-form-row .tabs-email-col form .tabs-email-input.invalid,
.tabs-email-checkbox-agree .tabs-email-label .tabs-email-check.invalid {
    border: 1px solid red !important;
}

.cart-type-login {
    padding: 16px 90px;
    width: 100%;
    max-width: 400px;
    font-family: Rubik-bold;
    font-size: 16px;
    text-align: center;
    color: #fff;
    background: #ed2025;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
}

.box-item-info {
    display: flex;
    align-items: center;
}

.box-item-info img {
    width: 100px;
    height: 75px;
    border-radius: 4px;
    object-fit: cover;
}

.box-item-info p {
    margin-left: 20px;
    margin-bottom: 0;
}

.product-item-add-box {
    margin-bottom: 10px;
}

.product-box-row {
    padding: 0 0 10px;
}

.product-box-row .product-item-desc {
    padding-left: 0;
}

.product-box-row p,
.product-comment-label {
    font-family: Rubik-medium;
    font-size: 16px;
    text-align: left;
    color: #000;
    overflow: hidden;
    opacity: 0.8;
    margin-left: 15px;
}

.product-message-label {
    margin-left: 115px;
}

.product-comment-number {
    padding: 10px 0;
}

.product-item-col-2 .price-regular {
    line-height: 44px;
}

.order-vat-notice {
    display: flex;
    margin-left: auto;
    padding: 5px 0;

    span {
        flex: 1;
        font-family: Rubik, sans-serif;
        font-size: 14px;
        color: #000;
        overflow: hidden;
        opacity: 0.5;
    }
}

.tabs-email-checkbox-agree {
    .tabs-email-label {
        a {
            color: #ed2025;
        }
    }
}

.cart-type-tabs .cart-payment-tabs-row {
    @media screen and (min-width: 768px) {
        flex-wrap: nowrap;
    }
}

.cart-type-tabs
.cart-payment-tabs-content
.payment-tabs-content
.tabs-payment-btn-row {
    &.recaptcha-row {
        @media screen and (min-width: 768px) {
            padding-right: 48px;
        }
        padding-bottom: 0;
    }
}

@media only screen and (max-width: 767px) {
    .product-message-label {
        margin-left: 0px;
    }
}
</style>
