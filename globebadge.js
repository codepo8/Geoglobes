/*
  Globebadge by Christian Heilmann
  http://isithackday.com/hacks/geo/globes/
  Copyright (c)2010 Christian Heilmann
  Code licensed under the BSD License:
  http://wait-till-i.com/license.txt
*/
globebadge = function(){
  var elm;
  function init(o){
    var isshiteMSIE = false;
    /*@cc_on
      isshiteMSIE = !window.XMLHttpRequest;
    @*/
    elm = o.element;
    if(typeof elm === 'string'){
      elm = document.getElementById(o.element); 
    };
    if(elm && o.location){
      var url = 'http://query.yahooapis.com/v1/public/yql?q='+
                'select%20*%20from%20geo.globeimage%20where%20place%3D%22'+
                 o.location+'%22';
      if(isshiteMSIE === false){
        url += '%20and%20type%3D%22data%22';
      }
      url += '%20and%20location%3D%22'+o.showlist+
             '%22&callback=globebadge.seed&format=xml'+
             '&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
      var s = document.createElement('script');
      s.setAttribute('src',url);
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  };
  function seed(o){
    if(o.results){
      var res = o.results[0];
      if(res.indexOf('<error')!==-1){
        var clean = res.replace(/<\/?error[^>]*>/g,'');
        elm.innerHTML = '<h2 class="error">'+clean+'</h2>';
      } else {
        elm.innerHTML = res;
      }
    }
    elm = '';
  };
  return{init:init,seed:seed};
}();