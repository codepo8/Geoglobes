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
    var isMSIE = /*@cc_on!@*/false;
    elm = document.getElementById(o.element);
    if(elm && o.location){
      var url = 'http://query.yahooapis.com/v1/public/yql?q='+
                'use%20%22http%3A%2F%2Fgithub.com%2Fyql%2Fyql-tables%2F'+
                'raw%2Fmaster%2Fgeo%2Fgeo.globeimage.xml%22%20as%20g%3B'+
                'select%20*%20from%20g%20where%20place%3D%22'+
                 o.location+'%22';
      if(isMSIE === false){
        url += '%20and%20type%3D%22data%22';
      }
      url += '%20and%20location%3D%22'+o.showlist+
             '%22&callback=globebadge.seed&format=xml';
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
  }
  return{init:init,seed:seed};
}();
