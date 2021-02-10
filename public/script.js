console.log('connected');

// const autoLang = navigator.languages[0].substring(0, 2);
// const selectedLang = navigator.languages[0].substring(0, 2);
// checkCookie('language', selectedLang);

// Language buttons control
document.querySelectorAll('.lang-control').forEach(btn => {
  btn.addEventListener('click', () => {
    const now = Date.now();
    btn.id === 'reset' ? document.cookie = "language=; " + "expires=" + (new Date(now - 10000 * 10000)) + ";path=/"
        : btn.id === 'ru' ? document.cookie = "language=ru; " + "expires=" +  (new Date(now + (365 * 24 * 60 * 60 * 1000)).toUTCString()) + ";path=/"
        : document.cookie = "language=en; " + "expires=" +  (new Date(now + (365 * 24 * 60 * 60 * 1000)).toUTCString()) + ";path=/";
    location.reload();
  });
});


/* --- COOKIE --- */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname, cvalue) {
  let cookie = getCookie(cname);
  if (cookie != "") {
   console.log("Cookie value is: " + cookie);
  } else {
    setCookie(cname, cvalue, 365);
    console.log('new cookie has been set');
  }
}
/* --- ----- --- */