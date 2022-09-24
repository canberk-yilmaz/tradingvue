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
        <div class="relative inline-flex self-center">
          <svg
            class="absolute top-0 right-0 m-2 pointer-events-none p-2 rounded"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="40px"
            height="40px"
            viewBox="0 0 38 22"
            version="1.1"
          >
            <title>F09B337F-81F6-41AC-8924-EC55BA135736</title>
            <g
              id="ZahnhelferDE—Design"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="ZahnhelferDE–Icon&amp;Asset-Download"
                transform="translate(-539.000000, -199.000000)"
                fill="#808080"
                fill-rule="nonzero"
              >
                <g
                  id="Icon-/-ArrowRight-Copy-2"
                  transform="translate(538.000000, 183.521208)"
                >
                  <polygon
                    id="Path-Copy"
                    transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) "
                    points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631"
                  />
                </g>
              </g>
            </g>
          </svg>
          <select
            class="text-l font-bold rounded border-2 border-gray-600 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          >
            <option disabled selected value>Select Currency</option>

            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>
        <div>Drowpdown 1</div>
        <div>Drowpdown 2</div>
      </section>

      <!-- RIGHT SECTION -->
      <section class="bg-red-200 w-2/3 px-2 py-4">
        <div id="right-header" class="flex items-center">
          <div class="currency-flag currency-flag-usd mr-2"></div>
          <div class="currency-flag currency-flag-eur mr-2"></div>
          <h2>Forex.com</h2>
        </div>
        <div class="currency-details flex justify-between">
          <div class="fx-pair">EUR / USD</div>
          <div class="items-end">
            <h2>Current Value $1000</h2>
            <h3>Change 123123123 (1231232%)</h3>
          </div>
        </div>
        <div class="chart">Chart</div>
        <div class="time-frame flex items-center justify-center">
          15M 1H 1D 1W 1M
        </div>
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
  },
  created() {
    // this.getCurrenciesList();
  },
};
</script>
<style></style>
