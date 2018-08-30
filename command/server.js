const childProcess = require('child_process')
const portfinder = require('portfinder')
const chalk = require('chalk')
const utils = require('./utils.js')
const path = require('path')

portfinder.basePort = +process.env.PORT || 8080
const autoOpenBrowser = true

const startServer = () => {
  portfinder.getPortPromise().then(port => {
    const commandStr = `npm run server -- --port ${port}`
    const output = childProcess.execSync(commandStr, {
      cwd: process.cwd(),
      timeout: 3000,
      encoding: 'utf8'
    })
    console.log(output)

    const urls = utils.prepareUrls('http', '0.0.0.0', port)
    
    console.log()
    console.log([
      `  App running at:`,
      `  - Local:   ${chalk.cyan(urls.localUrlForTerminal)}`,
      `  - Network: ${chalk.cyan(urls.lanUrlForTerminal)}`
    ].join('\n'))
    console.log()
  
    // when env is testing, don't need open it
    if (autoOpenBrowser) {
      utils.startBrowserProcess(urls.localUrlForBrowser)
    }
  }).catch(err => {
    console.log(err)
  })
}

startServer()