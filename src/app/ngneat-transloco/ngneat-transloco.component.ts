import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslocoService} from '@ngneat/transloco';
import {Configurations, ConfigurationService, TranslationService} from '@lessify/angular-core';

@Component({
  selector: 'app-ngneat-transloco',
  templateUrl: './ngneat-transloco.component.html',
  styleUrls: ['./ngneat-transloco.component.scss']
})
export class NgneatTranslocoComponent implements OnInit {
  configurations: Configurations;
  form: FormGroup;
  loginInvalid: boolean;

  constructor(
      private readonly router: Router,
      private readonly translateService: TranslationService,
      private readonly configurationService: ConfigurationService,
      private readonly fb: FormBuilder,
      private readonly service: TranslocoService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.configurations = this.configurationService.getAll();
  }

  onSubmit(): void {
    if (this.form.controls.username.value === 'admin' && this.form.controls.password.value === 'admin') {
      this.loginInvalid = false;
    } else {
      this.loginInvalid = true;
    }
  }

  change(lang: string): void {
    this.service.setActiveLang(lang);
  }
}
