const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const body = JSON.parse(event.body);
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENROUTER_KEY,
        "HTTP-Referer": "https://snazzy-starburst-365917.netlify.app",
        "X-Title": "Employment Analyzer"
      },
      body: JSON.stringify(body)
    });
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: text
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({error: e.message}) };
  }
};

exports.handler = handler;
exports.config = { timeout: 26 };
module.exports = { handler };
