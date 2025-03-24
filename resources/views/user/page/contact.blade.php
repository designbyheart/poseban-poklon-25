@extends('layouts.app')

@section('seo_title', 'Poseban Poklon | Kontakt')
@section('seo_description', 'Imaš pitanje, sugestiju, primedbu? Kontaktiraj nas, naš tim će ti odgovoriti u najkraćem mogućem roku!')
@section('seo_keywords', 'Poseban poklon, poseban poklon kontakt, kontakt')

@section('content')

<section class="information-container container">
    <div class="row">
        <h2 class="information-title col-lg-12">
            Kontaktiraj nas
        </h2>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <information-sidebar></information-sidebar>
        </div>
        <div class="col-lg-9 col-md-9 information-content-text">
            <div class="information-contact-container">
                <div class="contact-info">
                    <h3 class="contact-info-title">
                        Kontaktiraj nas
                    </h3>
                    <p class="contant-info-desc">
                        Molimo kontaktirajte našu korisničku podršku ukoliko vam treba pomoć prilikom poručivanja ili dostave, imate žalbu ili sugestiju.
                    </p>
                    <div class="contact-info-icons">
                        <div class="contact-company-info">
                            <p>Virtual Media Team doo</p>
                            <p>Delatnost: Trgovina na malo posredstvom pošte ili preko interneta (šifra 4791)</p>
                            <p>Matični broj: 21132110</p>
                            <p>Poreski broj broj: 109144593</p>
                        </div>
                        <div class="info-icon-number">
                            <a href="#" class="info-icon-link">
                                <div class="info-image">
                                    <img src="/images/icons/information_phone_icon.svg" alt="PosebanPoklon"
                                        class="icon-number">
                                </div>
                                <div class="icon-number-text">+381 60 533 5325</div>
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
                                <div class="icon-locat-text">Svetozara Lazovića Gonga 4, 31000 Užice, Srbija</div>
                            </a>
                        </div>
                        <div class="contact-open-time">
                            Ponedeljak - Petak: 09:00 - 17:00
                        </div>
                        <div class="contact-map">
                        </div>
                    </div>
                </div>
                <div class="contact-form">
                    <h3 class="contact-info-title">
                        POŠALJITE NAM EMAIL
                    </h3>
                    <!--<p class="contant-info-desc">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit ea vitae iusto illo esse
                            itaque aliquam dignissimos temporibus consectetur voluptatem omnis voluptate dicta ab
                            maiores fugiat, repudiandae animi assumenda facilis!
                        </p>-->
                    <div class="contact-form-container">
                        <div class="form-col-title">
                            <div class="form-input-title">Ime i prezime *</div>
                            <div class="form-input-title">Email *</div>
                            <div class="form-input-title">Poruka *</div>
                        </div>
                        <div class="form-col">
                            <form method="POST" action="/contact/send">
                                <input type="text" name="name" id="" class="form-input" placeholder="" required>
                                <input type="text" name="email" id="" class="form-input" placeholder="" required>
                                <textarea name="message" id="" cols="30" rows="10" class="form-textarea"
                                    placeholder="Dodaj poruku" required></textarea>
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

@endsection