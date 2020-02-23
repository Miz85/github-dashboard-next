import fetch from 'node-fetch';

export default async (req, res) => {
  let rawResponse;

  try {
    rawResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        Authorization: `token ${req.cookies.token}`
      }
    });
    const response = await rawResponse.json();
    console.log('?????????', response)
    if (!response.data) {
      throw new Error(JSON.stringify(response))
    }
    res.end(JSON.stringify(response));
  } catch (error) {
    res.status(rawResponse.status).end(JSON.stringify(error));
  }
};
