import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule], 
  template: `
    <button 
      (click)="toggleTheme()" 
      class="relative inline-flex items-center mt-2 h-6 rounded-full w-12 transition-colors focus:outline-none"
      [ngClass]="{'bg-gray-600': isDarkMode, 'bg-gray-200': !isDarkMode}"
      aria-label="Toggle theme">
      
      <!-- Toggle circle -->
      <span 
        class="inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm"
        [ngClass]="{'translate-x-6': isDarkMode, 'translate-x-1': !isDarkMode}">
        
        <!-- Optional tiny icon inside circle -->
        <svg *ngIf="isDarkMode" class="h-3 w-3 m-1 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        <svg *ngIf="!isDarkMode" class="h-3 w-3 m-1 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" />
        </svg>
      </span>
      
      <span class="sr-only">
        {{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}}
      </span>
    </button>
  `
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      darkMode => this.isDarkMode = darkMode
    );
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}