<template>
  <header id="navbar" class="header-container">
    <div class="container">
      <div class="sub-header-row">
        <div class="row">
          <div class="sub-header-col col-left col-lg-6 col-md-12">
            <div class="sub-header-number">
              <a :href="'tel:' + applicationParams.contact_phone" class="sub-header-number-link">
                <img src="/images/icons/phone_icon.svg" alt class="sub-header-number-icon" />
                <span class="sub-header-number-text">{{ applicationParams.contact_phone }}</span>
              </a>
            </div>
            <div class="sub-header-email">
              <a :href="'mailto:' + applicationParams.contact_email" class="sub-header-email-link">
                <img src="/images/icons/envelope_icon.svg" alt class="sub-header-email-icon" />
                <span class="sub-header-email-text">{{ applicationParams.contact_email }}</span>
              </a>
            </div>
          </div>
          <div class="sub-header-col col-right col-6">
            <div class="sub-header-info sub-header-dropdown">
              <div class="sub-header-info-link">
                <span class="sub-header-info-text">Informacije</span>
              </div>
              <div class="sub-header-info-dropdown">
                <a href="/o-nama" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">O nama</div>
                </a>
                <a href="https://promo.posebanpoklon.rs/" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">Za partnere</div>
                </a>
                <a href="/uslovi-koriscenja" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">Uslovi korišćenja</div>
                </a>
                <a href="/uslovi-prodaje" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">Uslovi prodaje</div>
                </a>
                <a href="/poverljivost-podataka" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">Poverljivost podataka</div>
                </a>
                <a href="/nasi-vauceri" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">Naši vaučeri</div>
                </a>
                <a href="/cesto-postavljana-pitanja" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">Često postavljana pitanja</div>
                </a>
                <a href="/porucite-poklon-telefonom" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">Poručite POKLON telefonom</div>
                </a>
                <a href="/garancije" class="sub-header-dropdown-link">
                  <div class="sub-header-dropdown-link-text">Garantujemo</div>
                </a>
              </div>
            </div>
            <div class="sub-header-contact">
              <a href="/kontaktiraj-nas" class="sub-header-info-link">
                <span class="sub-header-info-text">Kontakiraj nas</span>
              </a>
            </div>
            <div class="sub-header-login">
              <a href="/profile/orders" class="sub-header-info-link">
                <span class="sub-header-info-text">Moj vaučer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="header-row">
        <div class="row">
          <div class="header-col-logo col-lg-3 col-md-6 col-sm-6 col-6">
            <a href="/" class="header-logo-link">
              <img
                :src="applicationParams.siteLogo !== null ? applicationParams.siteLogo : '/images/header/posebanpoklon_logo.png'"
                alt
                class="header-logo-image"
              />
            </a>
          </div>
          <div class="header-col-search col-lg-6">
            <div class="header-search-row">
              <!--<span class="header-search-text">
                                Sve
              </span>-->
              <input
                type="text"
                class="header-search-input"
                placeholder="Pretraži ponude"
                v-model="search.query"
                @input="searchProductItems()"
              />
              <button type="submit" class="header-search-box">
                <img src="/images/icons/search_icon.svg" alt class="header-search-icon" />
              </button>
            </div>
            <div class="header-search-dropdown" v-if="results.length">
              <a
                :href="productUrl(product.slug)"
                class="search-dropdown-item-link"
                :key="index"
                v-for="(product,index) in results"
              >
                <div class="search-dropdown-item">
                  <img
                    v-bind:src="product.images.length ? product.images[0].url : search.defaultImage"
                    alt="PosebanPoklon"
                    class="search-item-image"
                  />
                  <div class="search-item-desc">{{ product.title }}</div>
                </div>
              </a>
            </div>
          </div>
          <div class="header-col-icons col-lg-3 col-md-6 col-sm-6 col-6">
            <button type="submit" class="mobile-search header-search-box">
              <img src="/images/icons/search_icon.svg" alt class="header-search-icon" />
            </button>
            <div class="header-icon-item wishlist-mobile">
              <a href class="header-icons-link wishlist">
                <img
                  src="/images/icons/wishlist_fill_red.svg"
                  alt
                  class="header-icons-heart"
                  v-if="checkWishlist()"
                />
                <img src="/images/icons/heart_icon.svg" alt class="header-icons-heart" v-else />
              </a>
              <header-wishlist></header-wishlist>
            </div>
            <div class="header-icon-item user-mobile">
              <a href="/login" class="header-icons-link user">
                <img src="/images/icons/user_icon.svg" alt class="header-icons-user" />
              </a>
              <div class="header-user-dropdown">
                <a href="/dashboard" class="dropdown-list-link" v-if="showDashboardLink">
                  <div class="dropdown-list-item">Korisnički panel</div>
                </a>
                <a href="/profile/edit" class="dropdown-list-link">
                  <div class="dropdown-list-item">Profil</div>
                </a>
                <div class="dropdown-list-link" v-if="applicationParams.user === null">
                  <div class="dropdown-list-item" @click="openAuthModal('login')">Uloguj se</div>
                </div>
                <div class="dropdown-list-link" v-if="applicationParams.user !== null">
                  <form name="logout" action="/logout" method="post">
                    <input type="submit" value="Odjava" class="dropdown-list-item" />
                    <input type="hidden" name="_token" :value="applicationParams.csrf" />
                  </form>
                </div>
              </div>
            </div>
            <header-cart></header-cart>
            <button id="header-hamburger" class="header-hamburger">
              <img src="/images/icons/hamburger_icon.svg" alt class="hamburger-icon" />
              <img src="/images/icons/hamburger_close_icon.svg" alt class="hamburger-close" />
            </button>
          </div>
          <div class="header-mobile-container">
            <!-- <div class="header-mobile-row">
              <input
                type="search"
                name
                id
                class="header-mobile-search-input"
                placeholder="Search products"
              />
              <button type="submit" class="header-search-box header-mobile-search-times">
                <img src="/images/icons/search_icon.svg" alt class="header-search-icon" />
              </button>
            </div>-->

            <div class="header-mobile-row">
              <!--<span class="header-search-text">
                                Sve
              </span>-->
              <input
                type="text"
                class="header-mobile-search-input"
                placeholder="Pretraži ponude"
                v-model="search.query"
                @input="searchProductItems()"
              />
              <button type="submit" class="header-search-box header-mobile-search-times">
                <img src="/images/icons/search_icon.svg" alt class="header-search-icon" />
              </button>
            </div>
            <div class="header-search-dropdown" v-if="results.length">
              <a
                :href="productUrl(product.slug)"
                class="search-dropdown-item-link"
                :key="index"
                v-for="(product,index) in results"
              >
                <div class="search-dropdown-item">
                  <img
                    v-bind:src="product.images.length ? product.images[0].url : search.defaultImage"
                    alt="PosebanPoklon"
                    class="search-item-image"
                  />
                  <div class="search-item-desc">{{ product.title }}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-menu-container">
      <div class="container">
        <nav class="menu-row">
          <div class="menu-item header-col-logo header-scroll-logo">
            <a href="/" class="header-logo-link">
              <img src="/images/header/posebanpoklon_logo_scroll.png" alt class="header-logo-image" />
            </a>
          </div>
          <div class="menu-item">
            <div class="menu-item-link">
              <span class="menu-item-text">Sve kategorije</span>
              <span class="menu-item-dropdown">
                <img
                  src="/images/icons/dropdown_white_icon.png"
                  alt
                  class="menu-item-dropdown-icon"
                />
              </span>
            </div>
            <div class="menu-dropdown-container">
              <div class="menu-dropdown container">
                <div class="menu-dropdown-col-links">
                  <div class="dropdown-links-list-container">
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/lepota-i-zdravlje"
                          class="dropdown-links-cat desktop-link"
                        >LEPOTA I ZDRAVLJE</a>
                        <div class="dropdown-links-cat mobile-link">LEPOTA I ZDRAVLJE</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/masaze" class="dropdown-links-subcat">Masaže</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/spa-paketi" class="dropdown-links-subcat">
                            Spa
                            Paketi
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/tretmani-za-lice"
                            class="dropdown-links-subcat"
                          >Tretmani za lice</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/tretmani-za-telo"
                            class="dropdown-links-subcat"
                          >Tretmani za telo</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/manikir-pedikir"
                            class="dropdown-links-subcat"
                          >Manikir / Pedikir</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/floating-spa"
                            class="dropdown-links-subcat"
                          >Floating spa</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/lepota-i-zdravlje"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/u-vazduhu"
                          class="dropdown-links-cat desktop-link"
                        >U VAZDUHU</a>
                        <div class="dropdown-links-cat mobile-link">U VAZDUHU</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/simulator-leta"
                            class="dropdown-links-subcat"
                          >Simulator leta</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/skok-padobranom" class="dropdown-links-subcat">
                            Skok
                            padobranom
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/let-paraglajdingom"
                            class="dropdown-links-subcat"
                          >Let paraglajdingom</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/panoramski-letovi"
                            class="dropdown-links-subcat"
                          >Panoramski letovi</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/u-vazduhu"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a href="/kategorije/za-volanom" class="dropdown-links-cat desktop-link">
                          ZA
                          VOLANOM
                        </a>
                        <div class="dropdown-links-cat mobile-link">
                          ZA
                          VOLANOM
                        </div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/off-road" class="dropdown-links-subcat">
                            Off
                            road
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/karting" class="dropdown-links-subcat">Karting</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/luksuzni-autobili"
                            class="dropdown-links-subcat"
                          >Luksuzni automobili</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/za-volanom"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a href="/kategorije/na-vodi" class="dropdown-links-cat desktop-link">
                          NA
                          VODI
                        </a>
                        <div class="dropdown-links-cat mobile-link">NA VODI</div>
                      </div>
                      <div class="dropdown-sublinks-item dropdown-main-cat">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/sport-na-vodi" class="dropdown-links-subcat">
                            Sport
                            na vodi
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/rafting" class="dropdown-links-subcat">Rafting</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/krstarenja" class="dropdown-links-subcat">Krstarenja</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/plivanje" class="dropdown-links-subcat">Plivanje</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/ronjenje" class="dropdown-links-subcat">Ronjenje</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/na-vodi" class="dropdown-links-subcat">Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/pucanje"
                          class="dropdown-links-cat desktop-link"
                        >PUCANJE</a>
                        <div class="dropdown-links-cat mobile-link">PUCANJE</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/streljana" class="dropdown-links-subcat">Streljana</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/paintball" class="dropdown-links-subcat">Paintball</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/pucanje" class="dropdown-links-subcat">Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/sport-i-aktivnosti"
                          class="dropdown-links-cat desktop-link"
                        >SPORT I AKTIVNOSTI</a>
                        <div class="dropdown-links-cat mobile-link">SPORT I AKTIVNOSTI</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/adrenalin-pokloni"
                            class="dropdown-links-subcat"
                          >Adrenalin pokloni</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/ekstremni-sportovi"
                            class="dropdown-links-subcat"
                          >Ekstremni sportovi</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/jahanje-konja"
                            class="dropdown-links-subcat"
                          >Jahanje konja</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/sportsko-penjanje"
                            class="dropdown-links-subcat"
                          >Sportsko penjanje</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/fitnes" class="dropdown-links-subcat">Fitnes</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/tenis" class="dropdown-links-subcat">Tenis</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/borilacke-vestine"
                            class="dropdown-links-subcat"
                          >Borilačke veštine</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/sport-i-aktivnosti"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/zabava-i-kultura"
                          class="dropdown-links-cat desktop-link"
                        >
                          ZABAVA
                          I KULTURA
                        </a>
                        <div class="dropdown-links-cat mobile-link">
                          ZABAVA
                          I KULTURA
                        </div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/zabavni-parkovi"
                            class="dropdown-links-subcat"
                          >Zabavni parkovi</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/escape-room" class="dropdown-links-subcat">
                            Escape
                            room
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/muzika-i-ples" class="dropdown-links-subcat">
                            Muzika
                            i ples
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/deciji-rodendani"
                            class="dropdown-links-subcat"
                          >Dečiji rođendani</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/pozoriste" class="dropdown-links-subcat">Pozorište</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/bioskopi" class="dropdown-links-subcat">Bioskopi</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/festivali" class="dropdown-links-subcat">Festivali</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/zabava-i-kultura"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/odmor-i-izleti"
                          class="dropdown-links-cat desktop-link"
                        >
                          ODMOR I
                          IZLETI
                        </a>
                        <div class="dropdown-links-cat mobile-link">
                          ODMOR I
                          IZLETI
                        </div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/izleti" class="dropdown-links-subcat">Izleti</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/romanticni-vikend"
                            class="dropdown-links-subcat"
                          >Romantični vikend</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/aktivni-odmor"
                            class="dropdown-links-subcat"
                          >Aktivni odmor</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/odmor-i-izleti"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/hedonizam"
                          class="dropdown-links-cat desktop-link"
                        >HEDONIZAM</a>
                        <div class="dropdown-links-cat mobile-link">HEDONIZAM</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/skola-kuvanja" class="dropdown-links-subcat">
                            Škola
                            kuvanja
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/restorani-i-barovi"
                            class="dropdown-links-subcat"
                          >Restorani i barovi</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/degustacije-pica"
                            class="dropdown-links-subcat"
                          >Degustacije pića</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/degustacija-hrane"
                            class="dropdown-links-subcat"
                          >Degustacija hrane</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/provod" class="dropdown-links-subcat">Provod</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/hedonizam"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/edukacja-i-kreativa"
                          class="dropdown-links-cat desktop-link"
                        >EDUKACIJA I KREATIVA</a>
                        <div class="dropdown-links-cat mobile-link">EDUKACIJA I KREATIVA</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/kreativne-radionice"
                            class="dropdown-links-subcat"
                          >Kreativne radionice</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/fotografija"
                            class="dropdown-links-subcat"
                          >Fotografija</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/muzika-i-ples" class="dropdown-links-subcat">
                            Muzika
                            i ples
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/radionica-kuvanja"
                            class="dropdown-links-subcat"
                          >Radionica kuvanja</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/moda-i-stil" class="dropdown-links-subcat">
                            Moda
                            i
                            stil
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/edukacja-i-kreativa"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="menu-dropdown-col-vips">
                  <a href="/kategorije/vip" class="dropdown-vips-link">
                    <div class="dropdown-vips-btn vip-ponude-btn">
                      <!-- <img src="images/header_dropdown_vip_icon.svg" alt="PosebanPoklon"
                      class="dropdown-vips-img">-->
                      <div class="dropdown-vips-img">
                        <svg
                          width="37px"
                          height="33px"
                          viewBox="0 0 37 33"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Home-Page"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Home-Page-4.2"
                              transform="translate(-1037.000000, -259.000000)"
                              fill="#F12127"
                              fill-rule="nonzero"
                            >
                              <g id="Dropdown" transform="translate(0.000000, 212.000000)">
                                <g id="Group-35" transform="translate(988.000000, 21.000000)">
                                  <g id="Group-37">
                                    <g id="Group-38">
                                      <path
                                        d="M85.6069521,37.865812 C85.3404817,37.6758982 84.9878002,37.6303189 84.6821429,37.7594603 L75.4418879,41.5349459 L68.3412339,26.524162 C68.1923239,26.2051069 67.8631545,26 67.4947983,26 C67.4947983,26 67.4869609,26 67.4869609,26 C67.1264421,26 66.7972727,26.1899138 66.6405253,26.5013723 L59.0853041,41.5273494 L50.3152911,37.7670568 C50.0096338,37.6379155 49.6491149,37.6683017 49.3826445,37.865812 C49.1083366,38.0557257 48.967264,38.3747809 49.0064509,38.7014325 L51.2009135,58.1865847 C51.2322629,58.4448675 51.3654982,58.672764 51.5849444,58.824695 C51.7965533,58.976626 52.0708611,59.0298019 52.3294942,58.9842225 L61.4208393,57.1838401 C65.457083,56.3862023 69.5481883,56.3862023 73.584432,57.1838401 L82.6757771,58.9842225 C82.738476,58.9994156 82.8011749,58.9994156 82.8638739,58.9994156 C83.059808,58.9994156 83.2557422,58.9386432 83.4203269,58.824695 C83.6319358,58.672764 83.7730084,58.4448675 83.8043578,58.1865847 L85.9988204,38.7014325 C86.0144952,38.3747809 85.8734226,38.0557257 85.6069521,37.865812 Z M59.1558404,43.5480318 C59.618245,43.7455421 60.1590233,43.5556284 60.3784696,43.1150284 L67.4634488,29.0310237 L74.1095356,43.0922388 C74.3211445,43.5404353 74.8619227,43.7455421 75.3321647,43.5556284 L83.9375931,40.0232323 L82.9265728,48.9415827 L52.047349,48.9415827 L51.0441661,40.0536185 L59.1558404,43.5480318 Z M82.0252757,56.9635401 L73.9449509,55.375861 C69.6579114,54.5250474 65.3160104,54.5326439 61.028971,55.3834576 L52.9486462,56.9635401 L52.2511206,50.7647548 L82.7228013,50.7647548 L82.0252757,56.9635401 Z"
                                        id="Shape"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span class="dropdown-vips-text">Vip ponude</span>
                    </div>
                  </a>
                  <a href="/kategorije/promo" class="dropdown-vips-link">
                    <div class="dropdown-vips-btn promotion-btn">
                      <!-- <img src="images/header_dropdown_star_icon.svg" alt="PosebanPoklon"
                      class="dropdown-vips-img">-->
                      <div class="dropdown-vips-img">
                        <svg
                          width="39px"
                          height="35px"
                          viewBox="0 0 39 35"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Home-Page"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <g
                              id="Home-Page-4.2"
                              transform="translate(-1035.000000, -371.000000)"
                              stroke="#58E223"
                              stroke-width="2.295"
                            >
                              <g id="Dropdown" transform="translate(0.000000, 212.000000)">
                                <g id="Group-32" transform="translate(975.000000, 137.000000)">
                                  <g id="Group-36">
                                    <g id="Group-39">
                                      <polygon
                                        id="Star"
                                        points="79.5 50.25 68.6259728 55.6577974 70.7027272 44.2038987 61.9054544 36.0922026 74.0629864 34.4211013 79.5 24 84.9370136 34.4211013 97.0945456 36.0922026 88.2972728 44.2038987 90.3740272 55.6577974"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span class="dropdown-vips-text">PROMOCIJE</span>
                    </div>
                  </a>
                  <a href="/kategorije/novi" class="dropdown-vips-link">
                    <div class="dropdown-vips-btn new-btn">
                      <!-- <img src="images/header_dropdown_new_icon.svg" alt="PosebanPoklon"
                      class="dropdown-vips-img">-->
                      <div class="dropdown-vips-img">
                        <svg
                          width="42px"
                          height="42px"
                          viewBox="0 0 42 42"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Home-Page"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Home-Page-4.2"
                              transform="translate(-1034.000000, -484.000000)"
                              stroke="#FFD949"
                            >
                              <g id="Dropdown" transform="translate(0.000000, 212.000000)">
                                <g id="Group-40" transform="translate(977.000000, 253.000000)">
                                  <g id="Group-41" transform="translate(59.000000, 21.000000)">
                                    <path
                                      d="M19.5,9.475 L19.5,27.525"
                                      id="Line-3"
                                      stroke-width="2.4000001"
                                      stroke-linecap="square"
                                      transform="translate(19.500000, 18.500000) rotate(90.000000) translate(-19.500000, -18.500000) "
                                    />
                                    <path
                                      d="M19.5,9.475 L19.5,27.525"
                                      id="Line-3"
                                      stroke-width="2.4000001"
                                      stroke-linecap="square"
                                    />
                                    <circle id="Oval" stroke-width="2.5" cx="19" cy="19" r="19" />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span class="dropdown-vips-text">NOVO</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="menu-item">
            <div class="menu-item-link">
              <span class="menu-item-text">Za koga</span>
              <span class="menu-item-dropdown">
                <img
                  src="/images/icons/dropdown_white_icon.png"
                  alt
                  class="menu-item-dropdown-icon"
                />
              </span>
            </div>
            <div class="menu-dropdown-container">
              <div class="menu-dropdown container">
                <div class="menu-dropdown-col-links">
                  <div class="dropdown-links-list-container">
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/pokloni-za-nju"
                          class="dropdown-links-cat desktop-link"
                        >
                          POKLONI
                          ZA NJU
                        </a>
                        <div class="dropdown-links-cat mobile-link">
                          POKLONI
                          ZA NJU
                        </div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-zenu" class="dropdown-links-subcat">
                            Za
                            ženu
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-majku" class="dropdown-links-subcat">
                            Za
                            majku
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-devojku" class="dropdown-links-subcat">
                            Za
                            devojku
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-cerku" class="dropdown-links-subcat">
                            Za
                            ćerku
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-baku" class="dropdown-links-subcat">
                            Za
                            baku
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-drugaricu" class="dropdown-links-subcat">
                            Za
                            drugaricu
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-seficu" class="dropdown-links-subcat">
                            Za
                            šeficu
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/pokloni-za-nju"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/pokloni-za-njega"
                          class="dropdown-links-cat desktop-link"
                        >POKLONI ZA NJEGA</a>
                        <div class="dropdown-links-cat mobile-link">POKLONI ZA NJEGA</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-muza" class="dropdown-links-subcat">
                            Za
                            muža
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-oca" class="dropdown-links-subcat">
                            Za
                            oca
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-decka" class="dropdown-links-subcat">
                            Za
                            dečka
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-sina" class="dropdown-links-subcat">
                            Za
                            sina
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-deku" class="dropdown-links-subcat">
                            Za
                            deku
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-druga" class="dropdown-links-subcat">
                            Za
                            druga
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-sefa" class="dropdown-links-subcat">
                            Za
                            šefa
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/pokloni-za-njega"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/pokloni-za-parove"
                          class="dropdown-links-cat desktop-link"
                        >POKLONI ZA PAROVE</a>
                        <div class="dropdown-links-cat mobile-link">POKLONI ZA PAROVE</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/dozivljaj-za-dvoje"
                            class="dropdown-links-subcat"
                          >Doživljaj za dvoje</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/spa-i-relaks" class="dropdown-links-subcat">
                            SPA
                            i
                            relaks
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/aranzmani" class="dropdown-links-subcat">Aranžmani</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/pokloni-za-parove"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/pokloni-za-drustvo"
                          class="dropdown-links-cat desktop-link"
                        >POKLONI ZA DRUŠTVO</a>
                        <div class="dropdown-links-cat mobile-link">POKLONI ZA DRUŠTVO</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/provod-sa-prijateljima"
                            class="dropdown-links-subcat"
                          >Provod sa prijateljima</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/dozivljaji-sa-drustvom"
                            class="dropdown-links-subcat"
                          >Doživljaji sa društvom</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/odmor-sa-drustvom"
                            class="dropdown-links-subcat"
                          >Odmor sa društvom</a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/pokloni-za-drustvo"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/pokloni-za-decu"
                          class="dropdown-links-cat desktop-link"
                        >
                          POKLONI
                          ZA DECU
                        </a>
                        <div class="dropdown-links-cat mobile-link">POKLONI ZA DECU</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-klince" class="dropdown-links-subcat">
                            Za
                            klince
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-tinejdzere" class="dropdown-links-subcat">
                            Za
                            tinejdžere
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/pokloni-za-decu"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/pokloni-za-decu"
                          class="dropdown-links-cat desktop-link"
                        >
                          POKLONI
                          ZA FIRME
                        </a>
                        <div class="dropdown-links-cat mobile-link">POKLONI ZA FIRME</div>
                      </div>
                      <div class="dropdown-sublinks-item">
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-radnike" class="dropdown-links-subcat">
                            Za
                            radnike
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/za-partnere" class="dropdown-links-subcat">
                            Za
                            partnere
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a href="/kategorije/team-building" class="dropdown-links-subcat">
                            Team
                            building
                          </a>
                        </div>
                        <div class="dropdown-links-item">
                          <a
                            href="/kategorije/pokloni-za-decu"
                            class="dropdown-links-subcat"
                          >Sve kategorije</a>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item dropdown-main-cat">
                        <a
                          href="/kategorije/pokloni-za-porodicu"
                          class="dropdown-links-cat desktop-link"
                        >
                          POKLONI
                          ZA PORODICU
                        </a>
                        <a
                          href="/kategorije/pokloni-za-porodicu"
                          class="dropdown-links-cat mobile-link"
                        >POKLONI ZA PORODICU</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="menu-dropdown-col-vips">
                  <a href="/kategorije/vip" class="dropdown-vips-link">
                    <div class="dropdown-vips-btn vip-ponude-btn">
                      <!-- <img src="images/header_dropdown_vip_icon.svg" alt="PosebanPoklon"
                      class="dropdown-vips-img">-->
                      <div class="dropdown-vips-img">
                        <svg
                          width="37px"
                          height="33px"
                          viewBox="0 0 37 33"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Home-Page"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Home-Page-4.2"
                              transform="translate(-1037.000000, -259.000000)"
                              fill="#F12127"
                              fill-rule="nonzero"
                            >
                              <g id="Dropdown" transform="translate(0.000000, 212.000000)">
                                <g id="Group-35" transform="translate(988.000000, 21.000000)">
                                  <g id="Group-37">
                                    <g id="Group-38">
                                      <path
                                        d="M85.6069521,37.865812 C85.3404817,37.6758982 84.9878002,37.6303189 84.6821429,37.7594603 L75.4418879,41.5349459 L68.3412339,26.524162 C68.1923239,26.2051069 67.8631545,26 67.4947983,26 C67.4947983,26 67.4869609,26 67.4869609,26 C67.1264421,26 66.7972727,26.1899138 66.6405253,26.5013723 L59.0853041,41.5273494 L50.3152911,37.7670568 C50.0096338,37.6379155 49.6491149,37.6683017 49.3826445,37.865812 C49.1083366,38.0557257 48.967264,38.3747809 49.0064509,38.7014325 L51.2009135,58.1865847 C51.2322629,58.4448675 51.3654982,58.672764 51.5849444,58.824695 C51.7965533,58.976626 52.0708611,59.0298019 52.3294942,58.9842225 L61.4208393,57.1838401 C65.457083,56.3862023 69.5481883,56.3862023 73.584432,57.1838401 L82.6757771,58.9842225 C82.738476,58.9994156 82.8011749,58.9994156 82.8638739,58.9994156 C83.059808,58.9994156 83.2557422,58.9386432 83.4203269,58.824695 C83.6319358,58.672764 83.7730084,58.4448675 83.8043578,58.1865847 L85.9988204,38.7014325 C86.0144952,38.3747809 85.8734226,38.0557257 85.6069521,37.865812 Z M59.1558404,43.5480318 C59.618245,43.7455421 60.1590233,43.5556284 60.3784696,43.1150284 L67.4634488,29.0310237 L74.1095356,43.0922388 C74.3211445,43.5404353 74.8619227,43.7455421 75.3321647,43.5556284 L83.9375931,40.0232323 L82.9265728,48.9415827 L52.047349,48.9415827 L51.0441661,40.0536185 L59.1558404,43.5480318 Z M82.0252757,56.9635401 L73.9449509,55.375861 C69.6579114,54.5250474 65.3160104,54.5326439 61.028971,55.3834576 L52.9486462,56.9635401 L52.2511206,50.7647548 L82.7228013,50.7647548 L82.0252757,56.9635401 Z"
                                        id="Shape"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span class="dropdown-vips-text">Vip ponude</span>
                    </div>
                  </a>
                  <a href="/kategorije/promo" class="dropdown-vips-link">
                    <div class="dropdown-vips-btn promotion-btn">
                      <!-- <img src="images/header_dropdown_star_icon.svg" alt="PosebanPoklon"
                      class="dropdown-vips-img">-->
                      <div class="dropdown-vips-img">
                        <svg
                          width="39px"
                          height="35px"
                          viewBox="0 0 39 35"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Home-Page"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <g
                              id="Home-Page-4.2"
                              transform="translate(-1035.000000, -371.000000)"
                              stroke="#58E223"
                              stroke-width="2.295"
                            >
                              <g id="Dropdown" transform="translate(0.000000, 212.000000)">
                                <g id="Group-32" transform="translate(975.000000, 137.000000)">
                                  <g id="Group-36">
                                    <g id="Group-39">
                                      <polygon
                                        id="Star"
                                        points="79.5 50.25 68.6259728 55.6577974 70.7027272 44.2038987 61.9054544 36.0922026 74.0629864 34.4211013 79.5 24 84.9370136 34.4211013 97.0945456 36.0922026 88.2972728 44.2038987 90.3740272 55.6577974"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span class="dropdown-vips-text">PROMOCIJE</span>
                    </div>
                  </a>
                  <a href="/kategorije/novo" class="dropdown-vips-link">
                    <div class="dropdown-vips-btn new-btn">
                      <!-- <img src="images/header_dropdown_new_icon.svg" alt="PosebanPoklon"
                      class="dropdown-vips-img">-->
                      <div class="dropdown-vips-img">
                        <svg
                          width="42px"
                          height="42px"
                          viewBox="0 0 42 42"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Home-Page"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Home-Page-4.2"
                              transform="translate(-1034.000000, -484.000000)"
                              stroke="#FFD949"
                            >
                              <g id="Dropdown" transform="translate(0.000000, 212.000000)">
                                <g id="Group-40" transform="translate(977.000000, 253.000000)">
                                  <g id="Group-41" transform="translate(59.000000, 21.000000)">
                                    <path
                                      d="M19.5,9.475 L19.5,27.525"
                                      id="Line-3"
                                      stroke-width="2.4000001"
                                      stroke-linecap="square"
                                      transform="translate(19.500000, 18.500000) rotate(90.000000) translate(-19.500000, -18.500000) "
                                    />
                                    <path
                                      d="M19.5,9.475 L19.5,27.525"
                                      id="Line-3"
                                      stroke-width="2.4000001"
                                      stroke-linecap="square"
                                    />
                                    <circle id="Oval" stroke-width="2.5" cx="19" cy="19" r="19" />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span class="dropdown-vips-text">NOVO</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="menu-item">
            <div class="menu-item-link">
              <span class="menu-item-text">Gradovi</span>
              <span class="menu-item-dropdown">
                <img
                  src="/images/icons/dropdown_white_icon.png"
                  alt
                  class="menu-item-dropdown-icon"
                />
              </span>
            </div>
            <div class="menu-dropdown-container">
              <div class="menu-dropdown container">
                <div class="menu-dropdown-col-links menu-dropdown-full-width">
                  <div class="dropdown-links-list-container menu-dropdown-full-width">
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/beograd" class="dropdown-links-cat">Beograd</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/nis" class="dropdown-links-cat">Niš</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/jagodina" class="dropdown-links-cat">Jagodina</a>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/grocka" class="dropdown-links-cat">Grocka</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/vrnjacka-banja" class="dropdown-links-cat">
                          Vrnjačka
                          banja
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/novi-sad" class="dropdown-links-cat">
                          Novi
                          Sad
                        </a>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/subotica" class="dropdown-links-cat">Subotica</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/Paracin" class="dropdown-links-cat">Paraćin</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/irig" class="dropdown-links-cat">Irig</a>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/kopaonik" class="dropdown-links-cat">Kopaonik</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/kragujevac" class="dropdown-links-cat">Kragujevac</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/vrsac" class="dropdown-links-cat">Vršac</a>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/loznica" class="dropdown-links-cat">Loznica</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/sombor" class="dropdown-links-cat">Sombor</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="menu-item">
            <div class="menu-item-link">
              <span class="menu-item-text">POSEBNE PRILIKE</span>
              <span class="menu-item-dropdown">
                <img
                  src="/images/icons/dropdown_white_icon.png"
                  alt
                  class="menu-item-dropdown-icon"
                />
              </span>
            </div>
            <div class="menu-dropdown-container">
              <div class="menu-dropdown container">
                <div class="menu-dropdown-col-links menu-dropdown-full-width">
                  <div class="dropdown-links-list-container menu-dropdown-full-width">
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/za-dan-zaljubljenih" class="dropdown-links-cat">
                          Za
                          dan zaljubljenih
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a
                          href="/kategorije/pokloni-za-rodendan"
                          class="dropdown-links-cat"
                        >Pokloni za rođendan</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a
                          href="/kategorije/devojacko-vece"
                          class="dropdown-links-cat"
                        >Devojačko veče</a>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/dan-majki" class="dropdown-links-cat">
                          Dan
                          majki
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/za-veridbu" class="dropdown-links-cat">
                          Za
                          veridbu
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a
                          href="/kategorije/pokloni-za-godisnjicu"
                          class="dropdown-links-cat"
                        >Pokloni za godišnjicu</a>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/za-dan-zena" class="dropdown-links-cat">
                          Za dan
                          žena
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/18-rodendan" class="dropdown-links-cat">
                          18.
                          rođendan
                        </a>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/momacko-vece" class="dropdown-links-cat">
                          Momačko
                          veče
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/dan-oceva" class="dropdown-links-cat">
                          Dan
                          očeva
                        </a>
                      </div>
                    </div>
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/kategorije/za-svadbu" class="dropdown-links-cat">
                          Za
                          svadbu
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/kategorije/rodenje-deteta" class="dropdown-links-cat">
                          Rođenje
                          deteta
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="menu-item">
            <a href="/kategorije/top-pokloni" class="menu-item-link desktop-link">
              <span class="menu-item-text">TOP POKLONI</span>
            </a>
            <div class="menu-item-link dropdown-links-cat mobile-link">
              <a href="/kategorije/top-pokloni" class="menu-item-link">
                <span class="menu-item-text">TOP POKLONI</span>
              </a>
            </div>
          </div>
          <div class="menu-item">
            <a href="/kategorije/gift-card" class="menu-item-link desktop-link">
              <span class="menu-item-text">GIFT CARD</span>
            </a>
            <div class="menu-item-link dropdown-links-cat mobile-link">
              <a href="/kategorije/gift-card" class="menu-item-link">
                <span class="menu-item-text">GIFT CARD</span>
              </a>
            </div>
          </div>
          <div class="menu-item only-mobile-link">
            <div class="menu-item-link">
              <span class="menu-item-text">Informacije</span>
              <span class="menu-item-dropdown">
                <img
                  src="/images/icons/dropdown_white_icon.png"
                  alt
                  class="menu-item-dropdown-icon"
                />
              </span>
            </div>
            <div class="menu-dropdown-container">
              <div class="menu-dropdown container">
                <div class="menu-dropdown-col-links menu-dropdown-full-width">
                  <div class="dropdown-links-list-container menu-dropdown-full-width">
                    <div class="dropdown-links-list">
                      <div class="dropdown-links-item">
                        <a href="/o-nama" class="dropdown-links-cat">O nama</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a
                          href="https://promo.posebanpoklon.rs/"
                          class="dropdown-links-cat"
                        >Za partnere</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/uslovi-koriscenja" class="dropdown-links-cat">Uslovi korišćenja</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/uslovi-prodaje" class="dropdown-links-cat">Uslovi prodaje</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a
                          href="/poverljivost-podataka"
                          class="dropdown-links-cat"
                        >Poverljivost podataka</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/nasi-vauceri" class="dropdown-links-cat">Naši vaučeri</a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/cesto-postavljana-pitanja" class="dropdown-links-cat">
                          Često postavljana
                          pitanja
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/porucite-poklon-telefonom" class="dropdown-links-cat">
                          Poručite POKLON
                          telefonom
                        </a>
                      </div>
                      <div class="dropdown-links-item">
                        <a href="/garancije" class="dropdown-links-cat">Garantujemo</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="menu-item only-mobile-link">
            <a href="/kontaktiraj-nas" class="menu-item-link desktop-link">
              <span class="menu-item-text">KONTAKIRAJ NAS</span>
            </a>
            <div class="menu-item-link dropdown-links-cat mobile-link">
              <a href="/kontaktiraj-nas" class="menu-item-link">
                <span class="menu-item-text">KONTAKIRAJ NAS</span>
              </a>
            </div>
          </div>
          <div class="menu-item only-mobile-link">
            <a href="/profile/orders" class="menu-item-link desktop-link">
              <span class="menu-item-text">Moj vaučer</span>
            </a>
            <div class="menu-item-link dropdown-links-cat mobile-link">
              <a href="/profile/orders" class="menu-item-link">
                <span class="menu-item-text">Moj vaučer</span>
              </a>
            </div>
          </div>
          <!-- <div class="menu-item">
                        <a href="/kontaktiraj-nas" class="menu-item-link">
                            <span class="menu-item-text">
                                Kontaktiraj nas
                            </span>
                        </a>
          </div>-->
          <div class="menu-item header-scroll-cart">
            <header-cart></header-cart>
          </div>
        </nav>
      </div>
    </div>
    <auth-modal></auth-modal>
  </header>
</template>

<script>
//Library for sending requests
import axios from "axios";

import HeaderCart from "./cart/HeaderCart";
import AuthModal from "./common/AuthModal";
import HeaderWishlist from "./wishlist/HeaderWishlist";

import lodash from "lodash";

export default {
  components: {
    HeaderWishlist,
    AuthModal,
    HeaderCart
  },
  name: "CommonHeader",
  data() {
    return {
      search: {
        active: false,
        query: "",
        defaultImage: "/images/default/product/posebanpoklon_product.jpg"
      },
      results: [],
      wishliststatus: ""
    };
  },
  computed: {
    showDashboardLink() {
      let user = this.applicationParams.user;

      if (user !== null) {
        if (user.role.name === "admin" || user.role.name === "editor") {
          return true;
        }
      }
    },
    searchResults() {
      let results = [];

      if (this.search.query !== "" || !/^\s*$/.test(this.search.query)) {
        results = this.search.results;
      }

      return results;
    }
  },
  methods: {
    searchProductItems() {
      this.handleSearch(this);
    },
    handleSearch: _.debounce(vm => {
      vm.results = [];

      if (vm.search.query !== "") {
        let requestUrl = vm.API.product.list;

        let requestParams = {
          search: vm.search.query
        };

        axios.get(requestUrl, { params: requestParams }).then(response => {
          //this.updateResults(response.data.data);
          vm.results = response.data.data;
        });
      }
    }, 400),
    updateResults(products) {
      this.results = products;
    },
    productUrl(slug) {
      return this.API.product.show + slug;
    },
    checkWishlist() {
      if (
        this.applicationParams.user !== undefined &&
        this.applicationParams.user !== null
      ) {
        let user = this.applicationParams.user;
        if (user.wishlist !== undefined && user.wishlist !== null) {
          if (
            user.wishlist.products !== undefined &&
            user.wishlist.products !== null
          ) {
            if (user.wishlist.products.length) {
              return true;
            }
          }
        }
      } else {
        return false;
      }
    }
  },
  mounted() {
    //Check wishlist
    //this.checkWishlist();
  }
};
</script>