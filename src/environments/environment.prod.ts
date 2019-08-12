export const environment = {
  production: true
};

export const API_URL = 'https://www.gofanattix.com/api' //https://104.248.59.103/api'
export const IMAGE_URL = 'https://www.gofanattix.com'  //https://104.248.59.103' //Needed if image is in a nested object b/c django does not give full url if image is nested

export const STRIPE_REDIRECT_URI = 'https://www.gofanattix.com/stripe-connect/'