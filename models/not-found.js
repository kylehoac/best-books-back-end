'use strict';

funciton notFound(request, response) {
  console.log('router not found');
  response.status(404).send('not found');
};


module.exports = notFound;