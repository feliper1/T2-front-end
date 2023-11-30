const axios = require('axios');

// Função para obter coordenadas a partir do nome da cidade
async function getCoordinates(cityName) {
    const apiKey = 'ef0b0973b783e0614ac87612ec04344b'; // Substitua pelo seu próprio chave da API
    const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    try {
        const response = await axios.get(geocodingApiUrl);
        const { lat, lon } = response.data[0];
        return { latitude: lat, longitude: lon };
    } catch (error) {
        console.error('Erro ao obter coordenadas:', error.message);
        throw error;
    }
}

// Função para obter condições climáticas atuais a partir das coordenadas
async function getCurrentWeather(latitude, longitude) {
    const apiKey = 'ef0b0973b783e0614ac87612ec04344b'; // Substitua pelo seu próprio chave da API
    const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const response = await axios.get(currentWeatherApiUrl);
        const { feels_like, weather } = response.data;
        const description = weather[0].description;

        console.log('Sensação térmica:', feels_like);
        console.log('Descrição:', description);
    } catch (error) {
        console.error('Erro ao obter condições climáticas:', error.message);
        throw error;
    }
}

// Exemplo de uso
async function main() {
    const cityName = 'São Paulo'; // Substitua pelo nome da cidade desejada
    try {
        const coordinates = await getCoordinates(cityName);
        console.log('Coordenadas:', coordinates);

        await getCurrentWeather(coordinates.latitude, coordinates.longitude);
    } catch (error) {
        console.error('Erro no script principal:', error.message);
    }
}

main();
