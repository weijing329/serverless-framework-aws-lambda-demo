'use strict'

const axios = require('axios')

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}

module.exports.getIpInfo = async (event, context) => {
  const sourceIp = event.requestContext.identity.sourceIp
  const ipstackApiKey = '98f360f6b242303826caee3958419e84'
  const [{ data: ipstack }, { data: ipapi }] = await Promise.all([
    axios.get(`http://api.ipstack.com/${sourceIp}
?access_key=${ipstackApiKey}&connection=1&security=1`),
    axios.get(`http://ip-api.com/json/${sourceIp}`),
  ])

  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body: JSON.stringify({
      sourceIp,
      ipapi,
      ipstack,
    }),
  }
}
