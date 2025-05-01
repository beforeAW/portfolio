import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgIf], 
  template: `
    <button 
      (click)="toggleTheme()" 
      class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme">
      <!-- Sun icon (shown in dark mode) -->
      <svg *ngIf="isDarkMode" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.45 1.27a1 1 0 010 1.41l-.7.7a1 1 0 11-1.42-1.4l.7-.7a1 1 0 011.42 0zm-9.9 1.41a1 1 0 01-1.4-1.41l.7-.7a1 1 0 011.4 1.4l-.7.7zM10 15a5 5 0 100-10 5 5 0 000 10zm-6.72-2.04a1 1 0 01.75 1.86l-.7.7a1 1 0 01-1.4-1.41l.7-.7a1 1 0 01.65-.45zM12 20a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.55 17.32a1 1 0 010-1.41l.7-.7a1 1 0 111.4 1.41l-.7.7a1 1 0 01-1.4 0zm10.35-.7a1 1 0 001.4-1.41l-.7-.7a1 1 0 00-1.4 1.4l.7.7z" clip-rule="evenodd" />
      </svg>
      <!-- Moon icon (shown in light mode) -->
      <svg *ngIf="!isDarkMode" class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    </button>
  `,
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