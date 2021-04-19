import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Configurations, ConfigurationService, TranslationService} from '@lessify/angular-core';

@Component({
  selector: 'app-ngx-translate',
  templateUrl: './ngx-translate.component.html',
  styleUrls: ['./ngx-translate.component.scss']
})
export class NgxTranslateComponent implements OnInit {
  configurations: Configurations;
  form: FormGroup;
  loginInvalid: boolean;

  constructor(
      private readonly router: Router,
      private readonly translateService: TranslationService,
      private readonly configurationService: ConfigurationService,
      private readonly fb: FormBuilder,
      public readonly translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.configurationService.configsChanges$.subscribe(it => this.configurations = it);
  }


  onSubmit(): void {
    if (this.form.controls.username.value === 'admin' && this.form.controls.password.value === 'admin') {
      this.loginInvalid = false;
    } else {
      this.loginInvalid = true;
    }
  }

  change(lang: string): void {
    this.translate.use(lang);
  }

  changeConfig(): void {
    this.configurationService.set('maintenance', !this.configurations.maintenance);
  }
}
