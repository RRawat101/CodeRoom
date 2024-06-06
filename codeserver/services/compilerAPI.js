const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://online-code-compiler.p.rapidapi.com/v1/',
  headers: {
       'x-rapidapi-key': 'd43b13c4a3msh6b90b8c68fa8e3ap18f992jsndda2dca161b7',

    // 'x-rapidapi-key': '7da3d0c03amshba1c0f21e21f4dap14722fjsn9f98080b9c7e',
    'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  data: {
    language: 'python3',
    version: 'latest',
    code: 'print("Hello, World!");',
    input: null
  }
};
const executeProgram=async (indata)=>{
  // options.append(data);
  console.log("inside Execute Program");
  options.data.code=indata.code;
  options.data.input=indata.inputValue;
  if(indata.language==='python')
    options.data.language='python3';
  else
    options.data.language=indata.language;
    
  try {
    console.log("options",options);
    // var response;
    const response = await axios.request(options);

    console.log("response",response);
    return response.data.output;
  } catch (error) {
    console.log("error occured");
    return "error occured while fetching compiler-API";
    console.error(error);
  }
}

module.exports=executeProgram;

