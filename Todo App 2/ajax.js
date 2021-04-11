let Ajax = function () {
  this.xhr = new XMLHttpRequest();
};

Ajax.prototype.get = function (url, paramObject, action) {
  let params = '';
  let sep = '';
  for (let p in paramObject) {
    params = params + sep + p + '=' + paramObject[p];
    sep = '&';
  }
  this.xhr.open('GET', url + '?' + params, true);
  let ajax = this;
  this.xhr.onreadystatechange = function () {
    if (ajax.xhr.readyState === XMLHttpRequest.DONE) {
      if (ajax.xhr.status === 200) {
        ajax.text = ajax.xhr.responseText;
        ajax.xml = ajax.xhr.responseXML;
        action(ajax.xhr.responseText, ajax.xhr.responseXML);
      }
    }
  };
  this.xhr.send();
};

Ajax.html = function (id, content) {
  document.getElementById(id).innerHTML = content;
};

Ajax.getHtml(id) = function (id) {
  return document.getElementById(id);
};

Ajax.value = function (id, value) {
  document.getElementById(id).value = value;
};

Ajax.getValue = function (id) {
  return document.getElementById(id).value;
};
