(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // JavaScript to be fired on all pages, after page specific JS is fired
    const iframe = document.getElementById('public-booking-iframe');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramValue = urlParams.get('token');

    if (paramValue && iframe) {
      iframe.setAttribute('src', `https://staging-buddy-frontend-zeta.vercel.app/bookings/manage/authorisation/${paramValue}`);
    }

    window.addEventListener('message', function (event) {
      if (event.data && event.data.type === 'customRedirect') {
        const finalUrl = event.data.data.redirectUrl;
        window.location.href = `${finalUrl}&public=public_url&currentUrl=${window.location.href}`;
      }
    });
  });
})();
