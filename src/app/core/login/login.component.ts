import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public options: any;
  public value: string[];
  public current: string;

  constructor(public formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationServ: NotificationService,
    private router: Router,
    protected route: ActivatedRoute) {

    this.loginForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {

    this.value = ['multiple2', 'multiple4'];

    this.options = {
      multiple: true
    };

    this.current = this.value.join(' | ');
  }

  changed(data: { value: string[] }) {
    this.current = data.value.join(' | ');
    console.log(data);
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

  sendMessage() {
    this.notificationServ.notify({ message: 'test ok', type: 'success' });
    this.router.navigate(['/']);
  }

}
