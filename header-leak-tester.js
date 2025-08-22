// header-leak-tester.js

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

const ROUTES = [
    '/',
    '/dashboard',
    '/rota-inexistente',
    '/api/auth/signin',
    '/api/auth/register',
    '/api/rota-fake-500' // ajuste para rotas que gerem 500 se desejar
];

const HEADERS_TO_TEST = {
    'Authorization': 'Bearer teste_token_cve',
    'Cookie': 'session_id=secret_session_id',
    'X-Test-Secret': 'my_custom_secret_value'
};

function checkLeak(text, headerValues) {
    for (const value of Object.values(headerValues)) {
        if (text.includes(value)) {
            return value;
        }
    }
    return null;
}

async function testRoute(route) {
    const url = `${BASE_URL}${route}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: HEADERS_TO_TEST
        });

        const body = await res.text();

        const leakedInBody = checkLeak(body, HEADERS_TO_TEST);
        const leakedInHeaders = checkLeak(JSON.stringify(res.headers.raw()), HEADERS_TO_TEST);

        console.log(`🔹 Testing ${url} - Status: ${res.status}`);
        if (leakedInBody || leakedInHeaders) {
            console.log(`❌ POTENTIAL LEAK detected on ${url}`);
            if (leakedInBody) {
                console.log(`    - Found in body: ${leakedInBody}`);
            }
            if (leakedInHeaders) {
                console.log(`    - Found in headers: ${leakedInHeaders}`);
            }
        } else {
            console.log(`✅ No leak detected on ${url}`);
        }
    } catch (err) {
        console.error(`❌ Error fetching ${url}:`, err.message);
    }
}

async function run() {
    for (const route of ROUTES) {
        await testRoute(route);
    }
}

run();
