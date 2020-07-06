const express = require('express')
const bodyParser = require('body-parser');
const needle = require('needle');

const port = process.env.PORT || 3000;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
	res.json("Surya Pro")
})

app.get('/ig/:username', function (req, res) {
    let user = req.params.username;

    getMedia(user)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(e => {
        res.status(200).json(e)
    })
})

app.get('/media/:media', function (req, res) {
    let detail = req.params.media;

    getMediaPostDetail(detail)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(e => {
        res.status(200).json(e)
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function getMedia(username) {
    return new Promise(function(resolve, reject) {
        let options = {
            follow_max: 5
        }
        needle.get(`https://www.instagram.com/${username}/?__a=1`, options, function(error, response, body) {
            // console.log(`[getMediaResponse] >>>>  ${JSON.stringify(body)}`)
            if (error) reject({
                msg: 'something wrong'
            })
            if (body === 'undifined' || typeof body.logging_page_id === 'undefined') reject({
                msg: 'wrong username or user not login'
            })

			// console.log(`[getMediaResponse] >>>> ${JSON.stringify(body)}`)
            resolve(body)
        })
    })
}

function getMediaPostDetail(shortcode) {
    return new Promise(function(resolve, reject) {
        let options = {
            follow_max: 5
        }
        needle.get(`https://www.instagram.com/p/${shortcode}/?__a=1`, options, function(error, response, body) {
            console.log(`[getMediaPostResponse] >>>> ${JSON.stringify(response.statusCode)}`)
            if (error) reject({
                msg: 'something wrong'
            })
            if (response.statusCode === 404 || typeof body.graphql === 'undefined') reject({
                msg: 'wrong username'
            })

            console.log(`[getMediaPostResponse] >>>> ${JSON.stringify(body)}`)
            resolve(body)
        })
    })
}
