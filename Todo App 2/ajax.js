let Ajax = function () {
  this.xhr = new XMLHttpRequest();
};

Ajax.prototype.makeRequest = function (method, url, paramObject) {
  return new Promise((resolve, reject) => {
    let ajax = this.xhr;
    ajax.open(method, url);
    ajax.onload = function () {
      if (ajax.status >= 200 && ajax.status < 300) {
        resolve(ajax.response);
      } else {
        reject({
          status: ajax.status,
          statusText: ajax.statusText,
        });
      }
    };
    ajax.onerror = function () {
      reject({
        status: ajax.status,
        statusText: ajax.statusText,
      });
    };

    if (method === "POST") {
      ajax.setRequestHeader("Content-type", "application/json");
    }

    ajax.send(JSON.stringify(paramObject));
  });
};

let $ = new Ajax();

export { $ };
