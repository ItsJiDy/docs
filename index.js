
        alert("task started")
        let session = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJod2lkIjoiaGFoYWgiLCJpZCI6IjUyZTE5ODZiZjc1YmE0YWMzNDM2MWRjODRjZjk5MTk4OGFlZmM0YWUzZjAwZmY2YzkyZDc3ZDUxYmMxMWQ1NmIiLCJ0eXBlIjoic2Vzc2lvbiIsImlhdCI6MTcxMzM0ODEzOCwiZXhwIjoxNzEzMzUxNzM4fQ.UaP-W5-7F7Bq71ykH9EUWG9KSoAkxzeSedBm9HYM5F_7b7CWiHmAMoRWfmzmv26X7-6jI1bfxyqJWjJS-Eghc1eMxBuYcpKrCOVFOFDUbKI3JykNrn32xqL6YJ-sHWDRs5DY1joZTf5sWseeUTktP98Pce3aT3n8SIScPzlnkNrv6j4zz6RUDQ-HfnTRTl203ctucxE52JkntTZ-rz6rNzPyJIlpI1Q4ezzKk3FzRS8bZl2VKUUVW63ezzzex0GRu0EhgMGEj84V9vomzHhfAdkRqLVEqQsXckTbSv_NWlV9u349Otv3SDpbnZdTD5IGsh7vXTf_DM_1e0dzlWR32g"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getStages() {
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
async function initiateStage(stageId) {
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
async function validateStage(token, referrer) {
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

async function authenticate(validatedTokens) {
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

    function base64decode(str) {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        return atob(str)
    }

    function decodeTokenData(token) {
        let data = token.split(".")[1];
        data = base64decode(data);
        return JSON.parse(data);
    }
    let stages = await getStages();
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

        let validatedToken = await validateStage(initToken, referrer);
        validatedTokens.push({ uuid: stageId, token: validatedToken });
        alert((stagesCompleted + 1) + '/3 completed');
        await sleep(1500);

        stagesCompleted++;
    }
    let ab = await authenticate(validatedTokens)
    if (ab) {
        alert("task completed")
        return true;
    } else {
        return false;
    }