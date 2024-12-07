import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ChartService } from '../../services/chart-data.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold mb-4">Impact scores of healthcare technologies: AI, IoT, telemedicine, precision medicine, and wearables.</h2>
            
            <div class="mb-8">
              <canvas #chartCanvas></canvas>
            </div>

            <div class="prose max-w-none">
              <p>
              The bar chart compares the impact scores (ranging from 0 to 10) of five transformative healthcare technologies. AI in diagnostics ranks the highest with a score of 9, showcasing its critical role in accurate and efficient patient analysis. Telemedicine and IoT-powered health monitoring follow closely, with scores of 8.5 and 8, respectively, reflecting their rising adoption for remote care and real-time health tracking. Wearables (8) and precision medicine (7.5) also show significant influence, underlining their importance in personalized healthcare and patient engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class SummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart: any;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartService.getSummaryData().subscribe(data => {
      this.createChart(data);
    });
  }

  private createChart(data: any): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: data[0].data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
}