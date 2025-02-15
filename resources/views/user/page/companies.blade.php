@extends('layouts.app')

@section('seo_title', 'Poseban Poklon | Postani naš partner')
@section('seo_description', 'Postani naš partner')

@section('content')

    <section class="information-container container">
        <div class="row">
            <h2 class="information-title col-lg-12">
                Postani naš partner
            </h2>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <information-sidebar></information-sidebar>
            </div>
            <div class="col-lg-9 col-md-9 information-content-text">
                <div class="information-contact-container">
                    <div class="contact-info">
                        <h3 class="contact-info-title">
                            Postani naš partner
                        </h3>
                        <p class="contant-info-desc">
                            Vodiš samostalan posao koji pruža izvanredna i posebna iskustva? Ili možda predstavljaš veliku kompaniju koja realizuje usluge koje odgovaraju našoj ideji? Naša misija je da obezbedimo što veći broj poklona koji će da ulepšaju trenutke za voljene, prijatelje, porodicu i firme. Tu smo da zajedno stvaramo izuzetne ponude i radimo na zajendičkom uspehu. Kontaktiraj nas putem mejla, pozivom na telefon ili popuni formular, a naš prodajni tim će se ubrzo javiti.
                        </p>
                        <div class="contact-info-icons">
                            <div class="info-icon-number">
                                <a href="#" class="info-icon-link">
                                    <div class="info-image">
                                        <img src="/images/icons/information_phone_icon.svg" alt="PosebanPoklon"
                                             class="icon-number">
                                    </div>
                                    <div class="icon-number-text">+381 60 533 5345</div>
                                </a>
                            </div>
                            <div class="info-icon-email">
                                <a href="#" class="info-icon-link">
                                    <div class="info-image">
                                        <img src="/images/icons/information_email_icon.svg" alt="PosebanPoklon"
                                             class="icon-email">
                                    </div>
                                    <div class="icon-email-text">kontakt@posebanpoklon.rs</div>
                                </a>
                            </div>
                            <div class="info-icon-locat">
                                <a href="#" class="info-icon-link">
                                    <div class="info-image">
                                        <img src="/images/icons/information_locat_icon.svg" alt="PosebanPoklon"
                                             class="icon-locat">
                                    </div>
                                    <div class="icon-locat-text">Metalska 64/4, Beograd, Srbija</div>
                                </a>
                            </div>
                            <div class="contact-open-time">
                                Ponedeljak - Petak 09:00 - 17:00
                            </div>
                            <div class="contact-map">
                            </div>
                        </div>
                    </div>
                    <div class="contact-form">
                        <h3 class="contact-info-title">
                            KONTAKT PODACI I KONTAKT FORMA
                        </h3>
                        <p class="contant-info-desc">
                            Takodje poseti našu dedikovanu stranicu za partnere gde ima mnogo više informacija o saradnji.
                            <a href="https://promo.posebanpoklon.rs">promo.posebanpoklon.rs</a>
                        </p>
                        <div class="contact-form-container">
                            <div class="form-col-title">
                                <div class="form-input-title">Ime i prezime *</div>
                                <div class="form-input-title">Naziv i sedište firme *</div>
                                <div class="form-input-title">Email *</div>
                                <div class="form-input-title">Telefon *</div>
                                <div class="form-input-title">Web sajt</div>
                                <div class="form-input-title">Poruka</div>
                            </div>
                            <div class="form-col">
                                <form action="">
                                    <input type="text" name="name" id="" class="form-input" placeholder="" required>
                                    <input type="text" name="company" id="" class="form-input" placeholder="" required>
                                    <input type="text" name="email" id="" class="form-input" placeholder="" required>
                                    <input type="text" name="phone" id="" class="form-input" placeholder="" required>
                                    <input type="text" name="website" id="" class="form-input" placeholder="">
                                    <textarea name="message" id="" cols="30" rows="10" class="form-textarea"
                                              placeholder="Dodaj poruku"></textarea>
                                    <div class="form-btn-row">
                                        <button class="form-btn" type="submit">Posalijte</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <company-tabs></company-tabs>

@endsection