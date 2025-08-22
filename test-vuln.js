const axios = require('axios');

async function testCVE() {
    try {
        const response = await axios.get('http://localhost:3000/dashboard', {
            headers: {
                'Authorization': 'Bearer teste_token',
                'X-Test-Header': 'valor_teste'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Erro na requisição:', error.response?.data || error.message);
    }
}

testCVE();
