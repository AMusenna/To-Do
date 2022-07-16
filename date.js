
exports.getDate =  function () {

  const today = new Date();

   return today.toLocaleDateString('de-DE', {month: 'long', day: 'numeric', weekday: 'long'});

}

exports.getDay =  function () {

   const today = new Date();

   return today.toLocaleDateString('de-DE', {weekday: 'long'});

}
