function initI18n() {
  i18next
    .use(i18nextFetchBackend)
    .init({
      lng: 'en', // default language
      debug: true,
      backend: {
        loadPath: '/locales/{{lng}}.json',
        requestOptions: {
          mode: 'no-cors',
        },
      },
    }, function(err, t) {
      updateContent();
    });
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, function(err, t) {
    updateContent();
  });
}

function updateContent() {
  document.querySelector('h1').innerHTML = i18next.t('welcome_title');
  document.querySelector('p').innerHTML = i18next.t('welcome_message');
}

