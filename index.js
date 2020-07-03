const express = require('express')
const needle = require('needle');
const app = express()


app.get('/ig', function (req, res) {
	getMedia(req.params.username)
	.then(data => {
		res.status(200).json(data)
	})
	.catch(e => {
		res.status(200).json(e)
	})
})

app.get('/', function (req, res) {
	res.json("Surya Pro")
})

app.listen(8000)



function getMedia(username) {
    return new Promise(function(resolve, reject) {
        let options = {
            follow_max: 5
        }
        needle.get(`https://www.instagram.com/${username}/?__a=1`, options, function(error, response, body) {
            console.log(`[getMediaResponse] >>>>  ${JSON.stringify(body)}`)
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
