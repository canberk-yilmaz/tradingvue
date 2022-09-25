<template>
  <div>
    <canvas id="line-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "LineChart",
  props: {
    chartData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    lineChartData() {
      return {
        type: "line",
        data: {
          labels: this.chartData.labels,
          datasets: [
            {
              data: this.chartData.data,
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 0,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  display: false,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
          elements: {
            point: {
              radius: 1,
            },
            line: {
              tension: 0,
            },
          },
          legend: false,
        },
      };
    },
  },
  mounted() {
    const ctx = document.getElementById("line-chart");
    new Chart(ctx, this.lineChartData);
  },
};
</script>
