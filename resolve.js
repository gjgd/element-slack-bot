const fetch = require('node-fetch');

module.exports.resolve = async (event) => {
  console.log(event);
  let response;
  const did = /text=([^&]*)&/.exec(event.body)[1];
  try {
    const result = await fetch(`https://uniresolver.io/1.0/identifiers/${did}`)
      .then((res) => res.json());
    const { didDocument } = result;
    response = `\`\`\`\n${JSON.stringify(didDocument, null, 2)}\`\`\``;
  } catch (e) {
    console.error(e);
    response = `couldn't resolve ${did}:\n${e.message}`;
  }
  return {
    statusCode: 200,
    body: response,
  };
};
