
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'gersonmlb',
  applicationName: 'reto-backend',
  appUid: '2qx3nMNV7wzFWcl5N8',
  orgUid: '3a0b8812-b0b6-4c0f-b347-142835c21075',
  deploymentUid: 'c210eac4-9115-4b9e-a7a7-e61337f752c0',
  serviceName: 'reto-backend',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '6.2.2',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'reto-backend-dev-getSpecieSwapi', timeout: 6 };

try {
  const userHandler = require('./api/species/v1/getSpecieSwapi.js');
  module.exports.handler = serverlessSDK.handler(userHandler.getSpecieSwapi, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}