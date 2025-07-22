(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const iframe = document.getElementById('public-booking-iframe');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramValue = urlParams.get('token');
    const redirectParamValue = urlParams.get('redirectToken');

    if (paramValue && iframe) {
      iframe.setAttribute('src', `https://staging-buddy-frontend-zeta.vercel.app/bookings/manage/authorisation/${paramValue}`);
    }

    if (redirectParamValue && iframe) {
      iframe.setAttribute('src', `https://staging-buddy-frontend-zeta.vercel.app/bookings/manage/summary/${paramValue}`);
    }

    window.addEventListener('message', function (event) {
      if (event.data && event.data.type === 'customRedirect') {
        const finalUrl = event.data.data.redirectUrl;
        window.location.href = `${finalUrl}&public=public_url&currentUrl=${window.location.href}`;
      }
    });
  });
})();
