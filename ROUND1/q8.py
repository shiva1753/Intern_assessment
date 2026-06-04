import requests

city = "London"

latitude = 51.5074
longitude = -0.1278

url = (
    f"https://api.open-meteo.com/v1/forecast"
    f"?latitude={latitude}"
    f"&longitude={longitude}"
    f"&current_weather=true"
)

weather_codes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    61: "Light rain",
    80: "Rain showers",
    95: "Thunderstorm"
}

try:
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()

        current = data["current_weather"]

        temperature = current["temperature"]
        weather_code = current["weathercode"]

        condition = weather_codes.get(
            weather_code,
            "Unknown weather condition"
        )

        print(f"City : {city}")
        print(f"Temperature : {temperature}°C")
        print(f"Condition : {condition}")

    else:
        print(f"Error: Received status code {response.status_code}")

except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")