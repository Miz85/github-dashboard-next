import fetch from 'node-fetch';

export default async (req, res) => {
    if (req.query && req.query.code) {
        const { code } = req.query;
        const response = await fetch(`https://github.com/login/oauth/access_token?` +
            `client_id=${process.env.GITHUB_CLIENT_ID}&` +
            `client_secret=${process.env.GITHUB_CLIENT_SECRET}&` +
            `code=${code}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                }
            }).then(resp => resp.json());
        res.writeHead(302, { Location: '/', 'Set-Cookie': `token=${response.access_token}; Max-Age=3600; Path=/` });
    }
    res.end();
}