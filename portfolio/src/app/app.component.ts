import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ThemeToggleComponent
  ],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header class="p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">My Portfolio</h1>
        <app-theme-toggle></app-theme-toggle>
      </header>
      <main class="container mx-auto p-4">
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
          Dark mode test element
        </div>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit(): void {
    // Force re-initialization of theme in case the index.html script didn't work properly
    this.themeService.initTheme();
  }
}