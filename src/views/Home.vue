<template>
  <div class="container">
    <!-- HEADER -->

    <!-- HEADER TITLE -->
    <h1>Forex Exchange</h1>

    <!-- HEADER TEXT -->
    <h3>Check out the current price for the currency pair</h3>

    <!-- LEFT SECTION -->
    <!-- Dropdowns -->
    <section>
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
          class="text-2xl font-bold rounded border-2 border-gray-600 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        >
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>
      <div>Drowpdown 1</div>
      <div>Drowpdown 2</div>
    </section>

    <!-- RIGHT SECTION -->
    <section>
      <div id="right-header">
        <div class="currency-flag currency-flag-usd"></div>
        <div class="currency-flag currency-flag-eur"></div>
        <h2>Forex.com</h2>
      </div>
      <div class="currency-details">
        <div class="fx-pair">EUR / USD</div>
        <div>
          <h2>Current Value $1000</h2>
          <h3>Change 123123123 (1231232%)</h3>
        </div>
      </div>
      <div class="chart">Chart</div>
      <div class="time-frame">15M 1H 1D 1W 1M</div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style></style>
