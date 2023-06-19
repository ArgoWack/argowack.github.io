function initI18n() {
  i18next.init({
    lng: 'en', // default language
    debug: true,
    resources: {
      en: {
        translation: {}
      },
      pl: {
        translation: {}
      }
    }
  }, function(err, t) {
    if (err) {
      console.error('Error initializing i18next:', err);
      return;
    }

    // Load translations for "en" language
    fetchTranslation('en').then(function(translations) {
      i18next.addResources('en', 'translation', translations);
      updateContent();
    }).catch(function(error) {
      console.error('Error loading "en" translations:', error);
    });

    // Load translations for "pl" language
    fetchTranslation('pl').then(function(translations) {
      i18next.addResources('pl', 'translation', translations);
      updateContent();
    }).catch(function(error) {
      console.error('Error loading "pl" translations:', error);
    });
  });
}

function fetchTranslation(language) {
  return fetch('locales/' + language + '.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.json();
    });
}

function updateContent() {
  document.querySelector('h1').innerHTML = i18next.t('welcome_title');
  document.querySelector('p').innerHTML = i18next.t('welcome_message');
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, function(err, t) {
    updateContent();
  });
}

