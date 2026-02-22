import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import House from '../models/house';
import { HouseService } from '../services/house.service';
import Statistics from '../models/statistics';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit, AfterViewInit {
    ngOnInit(): void {
    const u = localStorage.getItem('user')
    if (u) this.owner = JSON.parse(u).username
    
    this.houseService.getOwnersHouses(this.owner).subscribe((data) => {
      if (data) {
        this.houses = data
        this.houses.forEach((house) => {
          this.reservationService.getStats(house._id).subscribe((statsData) => {
            if (statsData) {
              this.chartData.push({house, stats: statsData})
            }
          })
        })
      }
    })
  }

  ngAfterViewInit() { //nkon sto se kompletno renderovao html
    setTimeout(() => {
      this.createCharts()
    }, 200)
  }

  private reservationService = inject(ReservationService)
  private houseService = inject(HouseService)

  houses: House[] = []
  stats: Statistics[] = []
  charts: Chart[] = []
  owner = ""
  chartData: {house: House, stats: Statistics}[] = []


  createCharts() {
    this.chartData.forEach((item) => {
      const monthly = (document.getElementById(`monthly-chart-${item.house._id}`) as HTMLCanvasElement).getContext('2d')
      if (!monthly) return
      this.charts.push(new Chart(monthly, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
          datasets: [{
            label: `${item.house.name} - Mesečna statistika`,
            data: item.stats.monthly,
            backgroundColor: '#a6c875'
          }]
        }
          }))
      
      const weekday = (document.getElementById(`weekday-chart-${item.house._id}`) as HTMLCanvasElement).getContext('2d')
      if (!weekday) return
          this.charts.push(new Chart(weekday, {
            type: 'pie',
            data: {
              labels: ['Radni dani', 'Vikend'],
              datasets: [{
                data: item.stats.weekday,
                backgroundColor: [
                  '#ada587',
                  '#ffbf00'
                ],
                borderColor: [
                  '#ada587',
                  '#ffbf00'
                ],
                borderWidth: 1
              }]
            }
          }))
    })
  }
}