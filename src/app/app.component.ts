import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from './globals';
import { BrowserNotification } from './lib/browserNotification';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-base-client-angular';

  user = {
    role: null
  };

  constructor(
    translate: TranslateService,
    public auth: AuthService,
    public globals: Globals,
    private browserNotification: BrowserNotification
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('tr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('tr');

    this.auth.getUser().subscribe(data => {
      this.user = data;

      this.browserNotification.check();

    });

  }

}
