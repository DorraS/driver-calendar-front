import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { NotificationService } from '@shared/directives/notification/notification.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public options: any;
  public value: string[];
  public current: string;

  constructor(public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    protected route: ActivatedRoute) {
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  login(data: any) {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(() => {
      // get return url from route parameters or default to '/'
      const queryParams: any = this.route.snapshot.queryParams;
      const returnUrl = queryParams.returnUrl as string || '/';
      this.router.navigateByUrl(returnUrl);
    }
    );
  }
}
