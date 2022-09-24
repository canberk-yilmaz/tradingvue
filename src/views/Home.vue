<template>
  <div class="bg-blue-200 md:max-w-3xl mx-auto px-6 py-3">
    <!-- HEADER -->

    <!-- HEADER TITLE -->
    <h1 class="text-4xl font-bold text-left">Forex Exchange</h1>

    <!-- HEADER TEXT -->
    <h3 class="text-left">Check out the current price for the currency pair</h3>

    <div class="flex mt-10 text-left">
      <!-- LEFT SECTION -->
      <!-- Dropdowns -->
      <section class="mr-10 w-1/3 flex flex-col items-center justify-center">
        <div class="relative inline-flex self-center mb-4">
          <select
            v-model="firstCurrency"
            class="text-l font-bold rounded border-2 border-gray-600 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          >
            <option disabled selected value="null">Select Currency</option>

            <option
              v-for="(currency, symbol) in currenciesList"
              :key="symbol"
              :value="symbol"
              :disabled="symbol === secondCurrency"
            >
              {{ currency }}
            </option>
          </select>
          <img
            src="@/assets/dropdown-arrow.svg"
            alt="dropdown-arrow"
            class="absolute h-10 w-10 top-0 right-0 m-2 pointer-events-none p-2 rounded"
          />
        </div>
        <div class="relative inline-flex self-center">
          <select
            v-model="secondCurrency"
            class="text-l font-bold rounded border-2 border-gray-600 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          >
            <option disabled selected value="null">Select Currency</option>

            <option
              v-for="(currency, symbol) in currenciesList"
              :key="symbol"
              :value="symbol"
              :disabled="symbol === firstCurrency"
            >
              {{ currency }}
            </option>
          </select>
          <img
            src="@/assets/dropdown-arrow.svg"
            alt="dropdown-arrow"
            class="absolute h-10 w-10 top-0 right-0 m-2 pointer-events-none p-2 rounded"
          />
        </div>
      </section>

      <!-- RIGHT SECTION -->
      <section class="bg-red-200 w-2/3 px-2 py-4">
        <div v-if="firstCurrency && secondCurrency">
          <div id="right-header" class="flex items-center">
            <div class="currency-flag currency-flag-usd mr-2"></div>
            <div class="currency-flag currency-flag-eur mr-2"></div>
            <h2>Forex.com</h2>
          </div>
          <div class="currency-details flex justify-between">
            <div class="fx-pair">
              {{ firstCurrency }} / {{ secondCurrency }}
            </div>
            <div class="items-end">
              <h2>Current Value $1000</h2>
              <h3>Change 123123123 (1231232%)</h3>
            </div>
          </div>
          <div class="chart">Chart</div>
          <div v-if="startDate && endDate">
            Between {{ startDate }} and {{ endDate }}
          </div>
          <div class="time-frame flex items-center justify-center">
            <button
              v-for="resolution in resolutionList"
              :key="resolution"
              @click="selectResolutionMethod(resolution)"
              class="mr-5"
              :class="{
                'bg-blue-200': resolution === selectedResolution,
              }"
            >
              {{ resolution }}
            </button>
          </div>
          <pre>
            {{ quotes }}
          </pre>
        </div>
        <div v-else>Please select a currency pair to see data</div>
      </section>
    </div>
  </div>
</template>

<script>
//imports
// import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      currenciesList: {
        AED: "UAE Dirham",
        ALL: "Albanian Lek",
        ARS: "Argentine Peso",
        AUD: "Australian Dollar",
        BGN: "Bulgaria Lev",
        BHD: "Bahraini Dinar",
        BRL: "Brazilian Real",
        CAD: "Canadian Dollar",
        CHF: "Swiss Franc",
        CLP: "Chilean Peso",
        CNH: "Chinese Yuan offshore",
        CNY: "Chinese Yuan onshore",
        COP: "Colombian Peso",
        CZK: "Czech Koruna",
        DKK: "Danish Krone",
        EUR: "Euro",
        GBP: "British Pound Sterling",
        GHS: "Ghanaian Cedi",
        HKD: "Hong Kong Dollar",
        HRK: "Croatian Kuna",
        HUF: "Hungarian Forint",
        IDR: "Indonesian Rupiah",
        ILS: "Israeli New Sheqel",
        INR: "Indian Rupee",
        ISK: "Icelandic Krona",
        JPY: "Japanese Yen",
        KES: "Kenyan Shillings",
        KRW: "South Korean Won",
        KWD: "Kuwaiti Dinar",
        MAD: "Moroccan Dirham",
        MUR: "Mauritian Rupee",
        MXN: "Mexican Peso",
        MYR: "Malaysian Ringgit",
        NGN: "Nigerean Naira",
        NOK: "Norwegian Krone",
        NZD: "New Zealand Dollar",
        OMR: "Omani Rial",
        PEN: "Peruvian Nuevo Sol",
        PHP: "Philippine Peso",
        PLN: "Polish Zloty",
        QAR: "Qatari Rial",
        RON: "Romanian Leu",
        RUB: "Russian Ruble",
        SAR: "Saudi Arabian Riyal",
        SEK: "Swedish Krona",
        SGD: "Singapore Dollar",
        THB: "Thai Baht",
        TRY: "Turkish Lira",
        TWD: "Taiwanese Dollar",
        USD: "US Dollar",
        VND: "Vietnamese Dong",
        XAG: "Silver (troy ounce)",
        XAU: "Gold (troy ounce)",
        XOF: "West African CFA franc",
        XPD: "Palladium",
        XPT: "Platinum",
        ZAR: "South African Rand",
        ZWL: "Zimbabwean Dollar",
      },
      firstCurrency: null,
      secondCurrency: null,
      selectedResolution: "15M",
      resolutionList: ["15M", "1H", "1D", "1W", "1M"],
      startDate: null,
      endDate: null,
      quotes: [
        {
          close: 1.00915,
          date: "2022-09-09",
          high: 1.01136,
          low: 0.99972,
          open: 0.99972,
        },
        {
          close: 1.01194,
          date: "2022-09-12",
          high: 1.01981,
          low: 1.00599,
          open: 1.00916,
        },
        {
          close: 0.9967,
          date: "2022-09-13",
          high: 1.01874,
          low: 0.9964,
          open: 1.01197,
        },
        {
          close: 0.99802,
          date: "2022-09-14",
          high: 1.00237,
          low: 0.99558,
          open: 0.99668,
        },
        {
          close: 0.9997,
          date: "2022-09-15",
          high: 1.0018,
          low: 0.99558,
          open: 0.99802,
        },
        {
          close: 1.00155,
          date: "2022-09-16",
          high: 1.00368,
          low: 0.99451,
          open: 0.99969,
        },
        {
          close: 1.0027,
          date: "2022-09-19",
          high: 1.00295,
          low: 0.9966,
          open: 1.00154,
        },
        {
          close: 0.99699,
          date: "2022-09-20",
          high: 1.00507,
          low: 0.99553,
          open: 1.00274,
        },
        {
          close: 0.98403,
          date: "2022-09-21",
          high: 0.99754,
          low: 0.98134,
          open: 0.99698,
        },
        {
          close: 0.98362,
          date: "2022-09-22",
          high: 0.99077,
          low: 0.98076,
          open: 0.98404,
        },
        {
          close: 0.96908,
          date: "2022-09-23",
          high: 0.98521,
          low: 0.96682,
          open: 0.98372,
        },
      ],
    };
  },
  methods: {
    // async getCurrenciesList() {
    //   try {
    //     const res = await axios.get(
    //       `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${process.env.VUE_APP_REST_API_KEY}`
    //     );
    //     console.log("res", res);
    //     this.currenciesList = res.data.available_currencies;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async selectResolutionMethod(resolution) {
      console.log("res", resolution);
      this.selectedResolution = resolution;
      let now = new Date();
      console.log("now", now);

      // try {
      //   const res = await axios.get(
      //     `https://marketdata.tradermade.com/api/v1/timeseries?currency=EURUSD&api_key=${process.env.VUE_APP_REST_API_KEY}&start_date=2022-09-09&end_date=2022-09-24&format=records`
      //   );
      //   console.log("res", res);

      //   this.startDate = res.data.start_date;
      //   this.endDate = res.data.end_date;
      //   this.quotes = res.data.quotes;

      //   // this.currenciesList = res.data.available_currencies;
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
  created() {
    // this.getCurrenciesList();
  },
  watch: {
    // selectedResolution(val) {
    //   console.log("val", val);
    // },
  },
};
</script>
<style></style>
