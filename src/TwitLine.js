import { merge } from 'kambo-functional'
const TWITTER_ENDPOINT = 'https://api.twitter.com/';

var Twitter = require('twitter-node-client').Twitter;
console.log('woah', Twitter)

class TwitLine {
    constructor( keys={} ) {
        this.keys    = keys
        
        /*
        let req = this.get('statuses/user_timeline',{'user_id': 'zero_likes'})
        req.then( (a) => {console.log("FUCK", a); })
           .catch( console.error )
        
        let auth = this.authenticate();
        auth.then( console.dir ).catch( console.error )
        console.log(auth)
        */
    }

    sign( consumer_key, consumer_secret) {
        let key     = encodeURIComponent(consumer_key)
        let secret  = encodeURIComponent(consumer_secret)

        return btoa(`${key}:${secret}`)
    }

    authenticate( ) {
        let bearer_token = this.sign( this.keys.key , this.keys.secret )

        return this.post('oauth2/token', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Basic ${bearer_token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: 'grant_type=client_credentials'
        })
    }

    url(a='undefined',b={}) { 
        return [`${TWITTER_ENDPOINT}${a}`, this.qs(b) ]
                .filter( x => x != '')
                .join('?')  }

    qs(a) { 
        return Object.keys(a).filter(key => a[key] !== null)
                .map(k => (encodeURIComponent(k) + "=" + encodeURIComponent(a[k])) )
                .join("&")    
    }


    headers(a={}) {
        return merge(a, {
            'Authentication': 'Bearer'
        })
    }

    get( method='statuses/user_timeline', params={} ) {
        return fetch( this.url(method, params), 
                      {method: 'GET',
                       headers: this.headers()} )
    }
    post( method='', params={}) {
        return fetch( this.url(method), merge({method: 'POST'}, params ))
    }
} 

export default TwitLine;