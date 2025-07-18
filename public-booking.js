(function () {
  // JavaScript to be fired on all pages, after page specific JS is fired
  const iframe = document.getElementById('public-booking-iframe');
  // iframe.style.visibility = 'visible';

  console.log('please work');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get('testValue');
  console.log('paramValue', paramValue);

  if (paramValue) {
    iframe.setAttribute('src', `https://staging-buddy-frontend-zeta.vercel.app/bookings/manage/authorisation/${paramValue}`);
  }

  window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'customUpdate') {
      const d = new Date();
      d.setTime(d.getTime() + (1 * 60 * 60 * 1000));
      let expires = 'expires=' + d.toUTCString();

      document.cookie = 'publicPageVisited=true; ' + expires + '; path=/';
      document.cookie = 'wordpressCart=eXo4gvmr5eeoJkEmpPNVlE%2F7T8NI7nIY2%2BSnJ5H7w3Rzxt270iGF6SV4pp7gKqrh; ' + expires + '; path=/';
      document.cookie = 'isBuddyAppUser=1; ' + expires + '; path=/';

      const finalUrl = `${parent.document.URL}/?cartId=${event.data.data.cartId ? 'MjAyNS0wNC0yNFQwNjo0MToxNi42NjNa' : ''}${`&shop=${event.data.data.webstore ? 'true' : 'false'}`}`;
      console.log(parent.document.URL);
      console.log('finalUrl', finalUrl);
      console.log('iframe', iframe);

      iframe.contentWindow.postMessage(
        {
          type: 'cookieCheck',
          hasCookie: 'true',
        },
        '*'
      );
    }

    if (event.data && event.data.type === 'customRedirect') {
      const d = new Date();
      d.setTime(d.getTime() + (1 * 60 * 60 * 1000));
      let expires = 'expires=' + d.toUTCString();

      document.cookie = 'publicPageVisited=true; ' + expires + ';domain=buddy.dev.smashy.space; path=/';

      const finalUrl = event.data.data.redirectUrl;
      console.log(parent.document.URL);
      console.log('finalUrl', finalUrl);
      console.log('iframe', iframe);

      window.location.href = `${finalUrl}&public=public_url&currentUrl=${window.location.href}`;
    }
  });
})();
