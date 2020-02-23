import fetch from 'node-fetch';

export default async (req, res) => {
  let rawResponse;
  try {
    rawResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`
      }
    });
    const response = await rawResponse.json();
    if (!response.query) {
      throw new Error(response)
    }
    res.end(JSON.stringify(response));
  } catch (error) {
    res.status(rawResponse.status).end(JSON.stringify(error));
  }
};
