const baseURL = 'http://192.168.85.1:9999';

function baseRequset(url, method, data, dataType) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: baseURL + url,
      type: method || 'GET',
      contentType: 'application/x-www-form-urlencoded',
      dataType: dataType || 'JSON',
      data: data || '',
      success: (res) => {
        console.log(res);
        resolve(res);
      },
      error: (error) => {
        reject(error);
      },
    })
    // .then((resolve) => {
    //   resolve(resolve);
    // })
    // .catch((error) => {
    //   reject(error);
    // });
  });
};