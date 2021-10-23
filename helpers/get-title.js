const superagent = require('superagent');

async function getTitle() {
    const res = await superagent.get('https://testathon-service.herokuapp.com/api/videos/title')
    return res.body.title
}
