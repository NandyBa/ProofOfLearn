const api_url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=apecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

async function getData() {
  const response = await fetch(api_url);
  const data = await response.json();
  const price = data[0].current_price;
  const volume = data[0].total_volume;
  console.log("Price ", price);
  console.log("Volume ", volume);
}

getData();
