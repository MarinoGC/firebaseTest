import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebase } from '../environments/firebase';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule} from "./core/core.module";

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
    declarations: [
        AppComponent,
        AppNavbarComponent,
        CoursesListComponent,
        UserProfileComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        AngularFireModule.initializeApp(firebase.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        NgbModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
