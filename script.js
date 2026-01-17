/* ====================== */
/*        GLOBAL          */
/* ====================== */



/* ========================================================================================= */
/* ----------------------------------- MODE CLAIR/SOMBRE ----------------------------------- */
/* ========================================================================================= */


/* OBJECTIF :
    - Bascule entre mode clair et mode sombre sur toutes les pages
    - Sauvegarde le choix de l'utilisateur dans localStorage
    - Restaure automatiquement le thème au chargement de la page
*/


document.addEventListener('DOMContentLoaded', () => {
    /* définie les variables */
    const bouton = document.querySelector('.theme-toggle');
    const icone = bouton.querySelector('img');

    /* restaure le thème sauvegardé au chargement de la page */
    const themeSauvegarde = localStorage.getItem('theme');
    /* de base clair donc si themeSauvergarde = dark alors le thème sera sombre */
    if (themeSauvegarde === 'dark') {
        document.body.classList.add('dark');
        /* change l'apparence du bouton theme-toggle */
        icone.src = '_images/icones_svg/mode_clair.svg';
        icone.alt = 'Icône mode clair';
    }

    /* gère le clic sur le bouton */
    bouton.addEventListener('click', () => {
        document.body.classList.toggle('dark');

        /* change l'icône selon le mode actif */
        if (document.body.classList.contains('dark')) { /* mode sombre */
            icone.src = '_images/icones_svg/mode_clair.svg';
            icone.alt = 'Icône mode clair';
            localStorage.setItem('theme', 'dark');
        } else { /* mode clair */
            icone.src = '_images/icones_svg/mode_sombre.svg';
            icone.alt = 'Icône mode sombre';
            localStorage.setItem('theme', 'light');
        }
    });
});





/* ====================== */
/*         INDEX          */
/* ====================== */



/* ========================================================================================= */
/* ----------------------------------- BOUTON VOIR-PLUS ------------------------------------ */
/* ========================================================================================= */


/* OBJECTIF :
    - Anime le bouton voir-plus quand l'une des images est cliquée 
*/


document.addEventListener('DOMContentLoaded', () => {
    /* définie les constantes */
    const bouton = document.querySelector('.index-bouton-voir-plus');
    const images = document.querySelectorAll('.index-img-pop');
    const duree_animation = 250;

    /* vérifie que le bouton existe (uniquement sur index.html) */
    if (bouton && images.length > 0) {
        /* vérifie si une des images est cliquée */
        images.forEach(img => {
            /* si une image est cliquée alors ajoute index-pop à la classe index-bouton-voir-plus*/
            img.addEventListener('click', () => {
                bouton.classList.add('index-pop');

                /* à la fin de duree_animation retire index-pop à la classe index-bouton-voir-plus */
                setTimeout(() => {bouton.classList.remove('index-pop')}, duree_animation);
            });
        });
    }
});





/* ====================== */
/*        CONTACT         */
/* ====================== */


/* ========================================================================================= */
/* -------------------------------------- FORMULAIRE --------------------------------------- */
/* ========================================================================================= */


/* OBJECTIF :
    - Vérifie chaque élément dans le formulaire puis renvoie dans la console le résultat si le 
    formulaire est valide sinon affiche un message d'erreur à chaque élément invalide 
*/


/* définie les constantes des éléments HTML */
const form = document.querySelector(".form")

/* vérifie que le formulaire existe (uniquement sur contact.html) */
if (form) {
    const genreSelect = document.querySelector("#selection-genre")
    const prenomInput = document.querySelector("#prenom")
    const nomInput = document.querySelector("#nom")
    const emailInput = document.querySelector("#email")
    const telephoneInput = document.querySelector("#telephone")
    const messageTextarea = document.querySelector("#message")

    /* définie la variable */
    let formValide = true;  /* booléen indiquant si le formulaire est valide globalement */

    form.setAttribute("novalidate", "");   /* désactive la validaiton par navigateur */ 


    /* ----- AFFICHER LA OU LES ERREUR(S) ----- */
    /* affiche le message d'erreur concernant l'élément tout deux en paramètres */
    function afficheErreur(element, message) {
        /* définie la constante */
        const erreur = document.createElement("p");
        /* stylise le message d'erreur */
        erreur.className = "message-erreur";
        element.classList.add("champ-erreur");
        /* sélectionne le message d'erreur */
        erreur.textContent = message;
        /* insère le message d'erreur directement sous l'élément */
        element.parentNode.insertBefore(erreur, element.nextSibling);
    }


    /* ----- RETIRER TOUTES LES ERREURS ----- */
    /* retire tout les messages et bordures d'erreur du formulaire */
    function retireErreurs() {
        /* supprime les messages d'erreur */
        const erreurs = document.querySelectorAll(".message-erreur");
        erreurs.forEach(erreur => erreur.remove());
    }

    /* ----- MESSAGE DE SUCCES ----- */
    /* affiche le message de succes concernant le formulaire */
    function afficherSucces(message) {
        /* définie la constante */
        const succes = document.createElement("p");
        /* stylise le message de succes */
        succes.className = "message-succes";
        /* sélectionne le message de succes */
        succes.textContent = message;
        /* insère le message d'erreur directement sous le bouton envoyé */
        const bouton = form.querySelector('input[type="submit"]');
        bouton.parentNode.insertBefore(succes, bouton.nextSibling);    
        /* se supprime automatiquement après 5 secondes */
        setTimeout(() => {succes.remove()}, 5000);
    }

    /* ----- INPUT TELEPHONE ----- */
    /* retreint les caractères de l'input téléphone aux chiffres uniquement et ajoute un espace tout les deux chiffres  */
    telephoneInput.addEventListener('input', function(e) {

        /* === CODE TROUVÉ SUR INTERNET === */

        /* garde uniquement les chiffres */
        let value = this.value.replace(/\D/g, '');
        /* limite à 10 chiffres maximum */
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        /* formate avec un espace tous les 2 chiffres */
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 2 === 0) {
                formatted += ' ';
            }
            formatted += value[i];
        }
        /* met à jour la valeur affichée */
        this.value = formatted;
    });


    /* ----- ENVOYER ----- */
    /* vérifie si le bouton envoyer est cliqué, si oui si les input sont correctes alors envoie des input dans la console si non alors message(s) d'erreur */
    form.addEventListener("submit", function(event) {

        /* empêche le rechargement de la page */
        event.preventDefault();
        
        /* repart de zéro à chaque envoi */
        retireErreurs();
        formValide = true;


        /* ----- GENRE ----- */
        /* si genre = "-- veuillez choisir une option --" alors message d'erreur + le formulaire n'est pas valide */
        if (genreSelect.value === "-- veuillez choisir une option --") {
            afficheErreur(genreSelect, "Veuillez sélectionner un genre.");
            formValide = false;
        }

        /* ----- PRÉNOM ----- */
        /* si longueur prénom < 2 alors message d'erreur + le formulaire n'est pas valide */
        if (prenomInput.value.trim().length < 2) {
            afficheErreur(prenomInput, "Veuillez entrer votre prénom (minimum 2 caractères).");
            formValide = false;
        }

        /* ----- NOM ----- */
        /* si longueur nom < 2 alors message d'erreur + le formulaire n'est pas valide */
        if (nomInput.value.trim().length < 2) {
            afficheErreur(nomInput, "Veuillez entrer votre nom de famille (minimum 2 caractères).");
            formValide = false;
        }

        /* ----- EMAIL ----- */
        /* si email est vide ou si email est invalide alors message d'erreur + le formulaire n'est pas valide */
        if (emailInput.value.trim() === "") {
            afficheErreur(emailInput, "Veuillez entrer votre email.");
            formValide = false;
        } else if (!emailInput.checkValidity()) {
            afficheErreur(emailInput, "Veuillez entrer un email valide.");
            formValide = false;
        }

        /* ----- TÉLÉPHONE ----- */
        /* si telephone est vide alors valide si telephone est non vide et possede moins de 10 chiffres alors  message d'erreur + le formulaire n'est pas valide */    
        if (telephoneInput.value.trim() !== "") {

            /* === CODE TROUVÉ SUR INTERNET === */

            /* enlève tout les espaces généré par le telephoneInput pour vérifier l'input */
            const digitsOnly = telephoneInput.value.replace(/\s/g, '');
            if (digitsOnly.length !== 10 || !/^[0][1-9]/.test(digitsOnly)) {
                afficheErreur(telephoneInput, "Numéro invalide (10 chiffres attendus, ex. 06 12 34 56 78)");
                formValide = false;
            }
        }


        /* ----- MESSAGE ----- */
        /* si longueur message < 2 est alors message d'erreur + le formulaire n'est pas valide */
        if (messageTextarea.value.trim() === "") {
            afficheErreur(messageTextarea, "Veuillez entrer votre message.");
            formValide = false;
        } else if (messageTextarea.value.length < 25) {
            afficheErreur(messageTextarea, "Le message doit contenir au moins 25 caractères.");
            formValide = false;
        }

        /* ----- VALIDATION FINALE ----- */
        /* si tout est valide renvoie les résultats donc la console et réinitialise le formulaire */
        if (formValide) {
            /* affiche les résultats du formulaire dans la console */
            console.log({
                Genre: genreSelect.value,
                Prenom: prenomInput.value.trim(),
                Nom: nomInput.value.trim(),
                Email: emailInput.value.trim(),
                Telephone: telephoneInput.value.trim(),
                Message: messageTextarea.value.trim()
            });

            /* réinitialise le formulaire */
            form.reset();

            /* affiche que le formulaire à bien été envoyé */
            afficherSucces("Bien envoyé !");
        }
    });
}