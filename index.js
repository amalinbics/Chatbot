
var express = require('express');
var bodyParser = require("body-parser");
const request = require('request')
const https = require('https')
var cors = require('cors')
const dialogflow = require('dialogflow');

const projectId="newagent-onmgvt";
const languageCode = "en-US";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(cors());

app.get('/', function (req, res) {
   res.send('works');
});

app.post('/dialogv2',function(req,res){

    let query = req.body.input;
    let sessionId=req.body.sessionId;
    let config = {
        credentials: {
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCTtVz0WAzCBhH/\nmCKuL1FxFIcIzcsW5N0Ctf1sjEqFS4WlJTegRqlHj4tYkzflJaIi35qKuVgNQq8g\nf7N5zrW47SCCHfF6YnlGGNSON/X/p4EXXEnzO6XZYHuse97j2hwVTJAefPpsTnhS\nul5XfirXkNLlZIO+EdA1eNvhlAcaNruW9tILkJ3c4A4E8rovGXnrNrJHKkuLdx7c\nhp576gjxY6BQ+95dLt2XkSEJKY/NtYSY2CQR/JD807P4eani5QJzGPs4CaUElljB\n74lXkst/ubEr+JKR4neJs2kKhyMrpZdQpL7VKj6ij8UQEYRHQ89OisUb1G94nqlh\nlcydcVxFAgMBAAECggEABN6PPGzkqsbJdBwfVI+xxyEOnI8wOUZ9NLgsLRZo5IEL\nXFjgPxPlQ7srNFXSG2dEs5KchSM8EF/Y5yDemU7jtb93eWKkUc0KQ3HRHAkjPnTW\nsB72PyMBwitImHSS8f8AOwGFpMOo+8YQeGW1c3vwzJ91HGPWZf8vVnvv/71CCK6l\naS6NiXsTC0mapUTZubRODx+NmJ8dNGpizRiu0Hp1BNja8A9HyDaFmLLLJ4E+o3oo\n9F7QCbrpCCqrpK8OzcTZWP/qFToii8e3OsoSPj1TXKVFnpEOUcEzGyeBLk3OX4kg\nl53IdRLmezFvLrFWIFsoDiMf0p0hdOAMJ/JEBGPmkQKBgQDEEfku6inNLHF9KIox\naWPJUgPYz/aki/yQ67cEBJKn/RleBkE7pV48abykYOyev8Z8VXCGBZ4CGktYwoZ6\nNJsOABYdXu7FM99pScpt6ijr7kEUaTWjRVk6IdxFk9vQmm9g2KZ2dnV05fpyBA4A\nMUu079W1Z6p8gB4K9u7JVGKxDQKBgQDA2zKEfx1oMkfTw6Tn+TDFV8c7yuQMAhMl\nMlaicfogZlpH3v6rEosJ5ifsEAxX4N8pnW0jWIGKjQRwYPA5tr4uSnTJNr8SEMmJ\nkP4Pe3JVWg+J4W4MpeBJvvo7PmMzIGh/QKw4CP6pI/oOfBqkpeb91oosHQi0Op62\nO+q8HO3aGQKBgQCEq0i55vZ7/zuXnavMfWxo19cEiMtyUcqHYQfIbzOw+cCFb6QK\nMP5P0Jg1feP+EvPCQ6nM9dYRxCsBlzaZUCku0v4jx4224D+mpaiUsSIZanCc2AfU\nP2N9w1Whuse9IhKFLHOOqt8VR1wsc/PpS3HXr4Uip0+jyKkLcETo8/GHrQKBgDp0\n9r4Urbw8qWr1/ZFXBkJ7Fef42uEM6/K1bG827yNNAwaQAE+ogj6Q5f726lbk0aAS\nmNdC55kwn2zU5VwJGWJ8rSOklYwLTJuHOItG1uQqNVWM4EezK+YOnljA017W7vXL\ni6g8ibyJLC2hzo2jv/2nPyCZ+F5w+lSwmrlEZ5BZAoGBALrdoAz5rWPluavgSsO0\nDfRGqdCY3yWg/9WVYJCDNJ/OweO+e5eZ+uynKSCvGz9MoOiKTSCmuRHZf6fjyXSK\nbYeIAZiMDQDCx52dmDEKv71dzhaiq5biTvcjodsdNU1YamGfJrWK38R6dSTrD3Ke\nqGA1tZFm4XSbYeJRcwBOvNUI\n-----END PRIVATE KEY-----\n",
            client_email: "dialogflow-uemjqf@newagent-onmgvt.iam.gserviceaccount.com"
        }
    };
    const client = new dialogflow.SessionsClient(config);
    const formattedSession = client.sessionPath('newagent-onmgvt', sessionId);
    const request = {
        session: formattedSession,
        queryInput: {
          text: {
            text: query,
            languageCode: languageCode,
          },
        },
      };

      try{
         responses =  client.detectIntent(request).then(result=>{
             console.log(result);
             res.send(result);
         });
        console.log('DialogFlow.sendTextMessageToDialogFlow: Detected intent');
        
    }catch(err)
    {   
        console.error('DialogFlow.sendTextMessageToDialogFlow ERROR:', err);
		res.send(err)
    }
});

app.post("/dialogv1",function(req,res){

    console.log("dialogv1 called");
    console.log(req.body.sessionId);
    const data = JSON.stringify({
        "query":req.body.input,
        "lang": "en",
        "sessionId": req.body.sessionId
    });

    request.post({
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ddb4b9ae436343cea357bd9ff4d8ec81'
        },
        url:'https://api.dialogflow.com/v1/query?v=20170712',
        body:data
      }, 
      function(error, response, body){
          if(error)
          {
            console.log(error);
            res.send(error);
          }
        console.log(body);
        res.send(body);
      });
})
 
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port   
    console.log("app listening at http://%s:%s", host, port)
 })