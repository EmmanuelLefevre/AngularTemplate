// --- I18n ---
const translations = {
  fr: {
    title: 'Une erreur est survenue.',
    label: 'Erreur',
    subtitle: 'Casques obligatoires !',
    message: 'On laisse sécher le code et on revient vite...',
    ariaLabel: "Une équipe technique s'affairant autour d'un écran en maintenance"
  },
  en: {
    title: 'An error has occurred.',
    label: 'Error',
    subtitle: 'Helmets are needed !',
    message: "We'll let the code dry and we'll be back soon...",
    ariaLabel: 'A technical team working on a screen undergoing maintenance'
  }
};

const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.startsWith('en') ? 'en' : 'fr';

document.getElementById('h1').innerText = translations[lang].title;
document.getElementById('h3').innerText = translations[lang].label;
document.getElementById('h4').innerText = translations[lang].subtitle;
document.getElementById('h5').innerText = translations[lang].message;

document.getElementById('lottie').setAttribute('aria-label', translations[lang].ariaLabel);

if (lang === 'en') {
  document.getElementById('h3-wrapper').style.flexDirection = 'row-reverse';
}

document.documentElement.lang = lang;

// AUTO-REFRESH ---
setInterval(async () => {
  try {
    const response = await fetch(window.location.href, {
      method: 'HEAD',
      cache: 'no-store'
    });

    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.info('Website still under maintenance...');
  }
}, 120000);
