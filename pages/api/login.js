export default (_, res) => {
    res.send({ loginUrl: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,read:org` });
}