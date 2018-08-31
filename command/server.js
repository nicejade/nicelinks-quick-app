const portfinder = require('portfinder')
const chalk = require('chalk')
const utils = require('./utils.js')
const shelljs = require('shelljs')

const autoOpenBrowser = true

const startServer = () => {
  portfinder.basePort = +process.env.PORT || 8080

  portfinder.getPortPromise().then(port => {
    const urls = utils.prepareUrls('http', '0.0.0.0', port)
    shelljs.exec(`hap server --port ${port}`, { async: true })

    printInfoAtTheTerminal(urls)
    autoOpenBrowser && utils.startBrowserProcess(urls.lanUrlForTerminal)
  }).catch(error => {
    console.log(`${chalk.red('✘')} Opps, Something Error：\n`, error)
  })
}

const printInfoAtTheTerminal = (urls) => {
  console.log()
  console.log([
    `App running at:`,
    `   ${chalk.green('✔')} Local:  ${chalk.cyan(urls.localUrlForTerminal)}`,
    `   ${chalk.green('✔')} Online: ${chalk.cyan(urls.lanUrlForTerminal)}`
  ].join('\n'))
  console.log()
}

startServer()