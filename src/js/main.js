// nav variables
const nav_burgerBtn = document.body.querySelector(".hamburger");
const nav__mobileLinks = document.body.querySelector(".nav__mobile__links");
const nav__mobileLinksList = document.body.querySelectorAll(".nav__mobile__links__link");
const nav__logo = document.body.querySelector(".nav__mobile__logo");
// contact variables
const contact_name = document.body.querySelector(".contact__form__sheet__name");
const contact_number = document.body.querySelector(".contact__form__sheet__number");
const contact_description = document.body.querySelector(".contact__form__sheet__description");
const contact__message = document.body.querySelector(".contact__form__sheet__message");
const contact_sumbitBtn = document.body.querySelector(".contact__form__sheet__button");
const contact_info = document.body.querySelector(".contact__form__sheet__info");


// nav functions
const nav__logoHandler = () => {
    nav__mobileLinks.classList.remove("nav__mobile__links--nav__exit");
}
const nav__burgerBtnHandler = () => {
    nav_burgerBtn.classList.toggle("is-active");
    nav__mobileLinks.classList.remove("nav__mobile__links--nav__exit");
    nav__mobileLinks.classList.add("nav__mobile__links--active");


    if (!nav_burgerBtn.classList.contains('is-active')) {
        nav__mobileLinks.classList.remove("nav__mobile__links--active");
        nav__mobileLinks.classList.add("nav__mobile__links--nav__exit");

    }
}

// contact functions 
const contact_sendEmail = (params) => {
    if (contact_name.value != "" && contact_number.value != "" && contact_description.value != "" && contact__message.value != "") {
        console.log("eee")
        var data = {
            service_id: 'service_6udhmad',
            template_id: 'template_sd1je3a',
            user_id: 'user_B209HdgYAl5zd8RfRdmcK',
            template_params: {
                name: contact_name.value,
                phone: contact_number.value,
                mail: contact_description.value,
                message: contact__message.value,
                // 'username': 'James',
                // 'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
            }
        };

        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function () {
            console.log('Your mail is sent!');
        }).fail(function (error) {
            console.log('Oops... ' + JSON.stringify(error))
        });

        contact_info.style.opacity = "1";
        contact_info.style.color = "green";
        contact_info.innerHTML = "Dziękujemy. Zgłoszenie zostało wysłane.";
        contact_sumbitBtn.disabled = "true";
    } else {
        contact_info.style.opacity = "1";
        contact_info.style.color = "red";
        contact_info.innerHTML = "Musisz uzupełnić wszystkie pola.";
    }
}



// nav event listeners
nav__logo.addEventListener("click", nav__logoHandler)
nav_burgerBtn.addEventListener("click", nav__burgerBtnHandler);

nav__mobileLinksList.forEach(item => item.addEventListener('click', () => {
    nav__mobileLinks.classList.remove("nav__mobile__links--active");
    nav_burgerBtn.classList.toggle("is-active");
}))

// contact event listeners

// change info when user click name input
contact_name.addEventListener("keyup", function () {

    if (contact_name.value.length < 3) {
        contact_info.style.opacity = "1";
        contact_info.innerHTML = "Podaj swoje poprawne imię, proszę";
        contact_info.style.color = "red";
    } else {
        contact_info.innerHTML = "Podaj imię, proszę";
        contact_info.style.opacity = "1";
        contact_info.style.color = "black";
    }


});

// change info when user click description input
contact_number.addEventListener("keyup", function () {
    contact_info.style.color = "black";
    contact_info.opacity = 1;
    contact_info.innerHTML = "Podaj swój numer telefonu, proszę";





});

// change info when user click description input
contact_description.addEventListener("keyup", function () {
    contact_info.style.opacity = "1";
    contact_info.innerHTML = "Podaj poprawny adres e-mail";
    contact_info.style.color = "black";
});

contact__message.addEventListener("keyup", function () {
    contact_info.style.opacity = "1";
    contact_info.innerHTML = "Podaj jakie usługi mają zostać wykonane";
    contact_info.style.color = "black";
});

contact_sumbitBtn.addEventListener("click", contact_sendEmail)