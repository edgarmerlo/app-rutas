import axios from 'axios';

const apiService = (method, url, data = '') => {
  const headers = {
    'x-api-key': 'Yrk3AZ1yOT7PIBbWJNrkB541cLBnff5w6cSZH9qr',
    'Accept': 'application/json',
    ...data.headers
  }
  const body = {...data.data}
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      headers,
      data: {...data.data}
    }).then(function(response) {
      resolve(response)
    });
  })
}

export default apiService