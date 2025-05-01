import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex">
      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-6">
        <a *ngFor="let item of navItems" 
           [href]="item.href"
           class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          {{item.label}}
        </a>
      </div>
      
      <!-- Mobile Toggle -->
      <button 
        (click)="toggleMobileMenu()" 
        class="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path *ngIf="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path *ngIf="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>
    
    <!-- Mobile Menu -->
    <div *ngIf="mobileMenuOpen" 
         class="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden">
      <div class="flex flex-col h-full p-5">
        <div class="flex justify-end">
          <button (click)="toggleMobileMenu()" class="p-2 text-gray-600 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex flex-col space-y-4 mt-10">
          <a *ngFor="let item of navItems" 
             [href]="item.href"
             (click)="toggleMobileMenu()"
             class="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2">
            {{item.label}}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent {
  mobileMenuOpen = false;
  
  navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Connect', href: '#connect' }
  ];
  
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}