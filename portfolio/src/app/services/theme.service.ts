import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize theme immediately in constructor
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
  }

  initTheme(): void {
    // Get from localStorage
    const savedTheme = localStorage.getItem('theme');
    
    let shouldBeDark = false;
    
    if (savedTheme) {
      // Use saved preference
      shouldBeDark = savedTheme === 'dark';
    } else {
      // Use system preference
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Save the preference
      localStorage.setItem('theme', shouldBeDark ? 'dark' : 'light');
    }
    
    // Update the state
    this.darkMode.next(shouldBeDark);
    
    // Update the DOM
    if (shouldBeDark) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
    
    // Debug
    console.log('Theme init - Dark mode:', shouldBeDark);
    console.log('Theme init - Dark class present:', this.document.documentElement.classList.contains('dark'));
  }

  toggleTheme(): void {
    const newDarkMode = !this.darkMode.value;
    
    // Update the state
    this.darkMode.next(newDarkMode);
    
    // Update the DOM
    if (newDarkMode) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
    
    // Update localStorage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    // Debug
    console.log('Theme toggled - Dark mode:', newDarkMode);
    console.log('Theme toggled - Dark class present:', this.document.documentElement.classList.contains('dark'));
  }
}