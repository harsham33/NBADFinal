import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ChartService } from '../../services/chart-data.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold mb-4">Adoption growth trends for telemedicine and AI in diagnostics from 2018 to 2022.</h2>
            
            <div class="mb-8">
              <canvas #chartCanvas></canvas>
            </div>

            <div class="prose max-w-none">
              <p>
              The line chart illustrates the progressive adoption of telemedicine and AI in diagnostics from 2018 to 2022. Telemedicine shows a dramatic rise, from a modest score of 4 in 2018 to a peak of 9 in 2022, driven by the growing need for remote consultations and accessible healthcare. AI in diagnostics also exhibits steady growth, increasing from 3 to 9 over the same period, highlighting its expanding application in predictive analytics, decision support, and clinical workflows. The trends indicate a robust future for digital health innovations, reshaping healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart: any;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartService.getReportsData().subscribe(data => {
      this.createChart(data);
    });
  }

  private createChart(data: any): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
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