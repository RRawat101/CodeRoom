const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://online-code-compiler.p.rapidapi.com/v1/',
  headers: {
    'x-rapidapi-key': '7da3d0c03amshba1c0f21e21f4dap14722fjsn9f98080b9c7e',
    'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    language: 'python3',
    version: 'latest',
    code: 'print("Hello, World!");',
    input: null
  }
};


export async function executeProgram(params)
{
    try {
        const response = await axios.request(options);
        return response.data.output;
    } catch (error) {
        console.error(error);
    }
}