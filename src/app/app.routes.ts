import { Routes } from "@angular/router";
import { ErrorComponent } from "./error/error.component";
import { CreationExerciseComponent } from "./page/creationexercise/creationexercise.component";
import { ExerciseListComponent } from "./page/exerciselist/exerciselist.component";
import { ExercisePageComponent } from "./page/exercisepage/exercisepage.component";
import { ExercisePageSolutionsComponent } from "./page/exercisepagesolutions/exercisepagesolutions.component";
import { HomeComponent } from "./page/home/home.component";
import { LoginComponent } from "./page/login/login.component";
import { PersonalpageComponent } from "./page/personalpage/personalpage.component";
import { RegisterComponent } from "./page/register/register.component";
import { TestPageComponent } from "./page/testpage/testpage.component";
import { TestsListComponent } from "./page/testslist/testslist.component";
import { UserPageComponent } from "./page/userpage/userpage.component";


export const routes: Routes = [
    {path: 'signup', component: RegisterComponent},
    {path: '',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'error',component: ErrorComponent},
    {path: 'exerciselist',component: ExerciseListComponent},
    {path: 'personalpage', component: PersonalpageComponent},
    {path: 'problem/:id', component: ExercisePageComponent },
    {path: 'creation',component: CreationExerciseComponent},
    {path: 'problem/:id/solutions', component: ExercisePageSolutionsComponent },
    {path: 'user/:id',component: UserPageComponent},
    {path: 'testslist',component: TestsListComponent},
    {path: 'test/:id', component: TestPageComponent },
]
