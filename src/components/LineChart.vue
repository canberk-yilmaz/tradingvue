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
    isChangePositive: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
    };
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
              backgroundColor: this.isChangePositive
                ? "rgba(71, 183,132,.5)"
                : "rgba(255, 0, 0,.5)",
              borderColor: this.isChangePositive
                ? "rgba(71, 183,132,.5)"
                : "rgba(255, 0, 0,.5)",
              borderWidth: 3,
            },
          ],
        },
        options: {
          layout: {
            padding: {
              left: 10,
              right: 20,
              top: 0,
              bottom: 0,
            },
          },
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
    this.chart = new Chart(ctx, this.lineChartData);
  },
  watch: {
    chartData: {
      handler: function () {
        this.chart.data.labels = this.chartData.labels;
        this.chart.data.datasets[0].data = this.chartData.data;
        this.chart.data.datasets[0].backgroundColor = this.isChangePositive
          ? "rgba(71, 183,132,.5)"
          : "rgba(255, 0, 0,.5)";
        this.chart.data.datasets[0].borderColor =
          this.chart.data.datasets[0].backgroundColor;
        this.chart.update();
      },
    },
  },
};
</script>
