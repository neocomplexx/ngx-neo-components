import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
};

const isCordovaApp = () => {
  return document.URL.indexOf('http://') === -1
    && document.URL.indexOf('https://') === -1;
};


if (isCordovaApp()) {
  document.addEventListener('deviceready', () => { bootstrap(); }, false);
} else {
  bootstrap();
}
