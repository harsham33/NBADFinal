import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold mb-4">Recent Innovations in HealthCare System</h2>
            
            <div class="prose max-w-none">
              <a class="text-lg text-blue-500 underline hover:text-blue-700 focus:ring focus:ring-blue-300" href="https://www.startus-insights.com/innovators-guide/healthcare-industry-trends/">Healthcare Industry Trends in 2025</a>
              <p class="mb-4">
              The article highlights the transformative trends in the healthcare industry driven by technology. Key innovations include AI for diagnostics, telemedicine, IoT health monitoring, and precision medicine. These advancements enable efficient diagnosis, remote patient care, and personalized treatment. Additionally, wearables and VR in medical training improve healthcare accessibility and patient engagement. Blockchain ensures secure data management, while robotics and automation streamline surgeries and workflows.

              The growing adoption of these technologies reflects a shift toward patient-centric, data-driven care. The integration of AI, IoT, and telemedicine demonstrates healthcare's response to global challenges, emphasizing innovation for improved efficiency and outcomes.
              </p>

              <h3 class="text-xl font-semibold mb-3">Technical Implementation</h3>
              <p>
                This project demonstrates a full-stack authentication system built with:
              </p>
              <ul class="list-disc pl-5 mb-4">
                <li>Frontend: Angular Js</li>
                <li>UI Framework: Tailwind CSS for responsive design</li>
                <li>Backend: Node.js with Express.js</li>
                <li>Database: MongoDB for user data storage</li>
                <li>Authentication: JWT-based token system</li>
                <li>Security: bcrypt for password hashing</li>
                <li>Charts: Chart.js for data visualization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class DashboardComponent {}