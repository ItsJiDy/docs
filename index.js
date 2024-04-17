const Express = require('express');
const Http = require('http');
const Https = require('https');

const App = Express();
const HttpServer = Http.createServer(App);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getStages(session) {
    let response = await fetch('https://api.codex.lol/v1/stage/stages', {
        method: 'GET',
        headers: {
            'Android-Session': session
        }
    });
    let data = await response.json();

    if (data.success) {
        if (data.authenticated) {
            return [];
        }
        return data.stages;
    }
}
async function initiateStage(stageId, session) {
    let response = await fetch('https://api.codex.lol/v1/stage/initiate', {
        method: 'POST',
        headers: {
            'Android-Session': session,
            'Content-Type': 'application/json'
        },
        body: '{"stageId":"' + stageId + '"}'
    });
    let data = await response.json();

    if (data.success) {
        return data.token;
    }
}
async function validateStage(token, referrer, session) {
    let response = await fetch('https://api.codex.lol/v1/stage/validate', {
        method: 'POST',
        headers: {
            'Android-Session': session,
            'Content-Type': 'application/json',
            'Task-Referrer': referrer
        },
        body: '{"token":"' + token + '"}'
    });
    let data = await response.json();

    if (data.success) {
        return data.token;
    }
}

async function authenticate(validatedTokens, session) {
    let response = await fetch('https://api.codex.lol/v1/stage/authenticate', {
        method: 'POST',
        headers: {
            'Android-Session': session,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tokens: validatedTokens })
    });
    let data = await response.json();

    if (data.success) {
        return true;
    }
}

async function bypasscodex(session) {
    function base64decode(str) {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        return atob(str)
    }

    function decodeTokenData(token) {
        let data = token.split(".")[1];
        data = base64decode(data);
        return JSON.parse(data);
    }
    
    let stages = await getStages(session);
    let stagesCompleted = 0;

    let validatedTokens = [];
    while (stagesCompleted < stages.length) {
        let stageId = stages[stagesCompleted].uuid;
        let initToken =await initiateStage(stageId, session);
        await sleep(6000)
        let tokenData = decodeTokenData(initToken);
        let referrer;
        if (tokenData.link.includes('loot-links')) {
            referrer = 'https://loot-links.com/';
        }
        else if (tokenData.link.includes('loot-link')) {
            referrer = 'https://loot-link.com/';
        }
        else {
            referrer = 'https://linkvertise.com/';
        }

        let validatedToken = await validateStage(initToken, referrer, session);
        validatedTokens.push({ uuid: stageId, token: validatedToken });
        console.log(stagesCompleted + '/3 completed');
        await sleep(1500);
        
        stagesCompleted++;
    }
    let ab = await authenticate(validatedTokens)
    if (ab) {
        return true;
    } else {
        return false;
    }
}

App.get(
    "/script/rendertest",
    (Request, Response) => {
        Response.send("I'm Alive!")
    }
)

App.get(
    "/bypass/codex/:hwid",
    async (Request, Response) => {
        let a = await bypasscodex(Request.params.hwid)
        if (a) {
            Response.send('{"code":"204","success":true}')
        } else {
            Response.send('{"code":"204","success":false}')
        }
    }
)

App.post(
    '/script/getchangelogs',
    (Request, Response) => {
        if (Request.headers.authorization == 'elf and tears') {
            Https.get(
                'https://raw.githubusercontent.com/ItsJiDy/shwebsocket/main/changelogs.json',
                (Res) => {
                    let Data = ''
                    Res.on(
                        'data',
                        (Chunk) => {
            	            Data += Chunk
            	        }
            	    )
            	    Res.on(
            	        'end',
            	        () => {
            	            Response.send(Data)
            	        }
            	    )
                }
            )
        } else {
            Response.send('{"code":"403","message":"Unauthorized."}');
        }
    }
)

App.post(
    '/script/checkpass/:userid/:pass',
    (Request, Response) => {
        if (Request.headers.authorization == 'elf and tears') {
            Https.get(
                'https://inventory.roblox.com/v1/users/' + Request.params.userid + '/items/GamePass/' + Request.params.pass,
                (Res) => {
                    let Data = ''
                    Res.on(
                        'data',
                        (Chunk) => {
            	            Data += Chunk
            	        }
            	    )
            	    Res.on(
            	        'end',
            	        () => {
            	            Data = JSON.parse(Data)
            	            if (Data.data.length > 0) {
            	                Response.send('{"code":"201","owned":true}')
            	            } else {
            	                Response.send('{"code":"201","owned":false}')
            	            }
            	        }
            	    )
                }
            )
        } else {
            Response.send('{"code":"403","message":"Unauthorized."}');
        }
    }
)

HttpServer.listen(
    3000,
    () => {
        console.log('Server listening on port 3000');
    }
)