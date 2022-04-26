import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

//Your Client ID
// 185231214533-f7bcruk4pkm5mnr5rl8hv3f2oflmlqb7.apps.googleusercontent.com

//Your Client Secret
//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
