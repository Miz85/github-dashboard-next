import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const rawResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`
      }
    });
    const response = await rawResponse.json();
    res.end(JSON.stringify(response));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
};
