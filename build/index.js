#!/usr/bin/env node

const path = require('path')
const webpack = require('webpack')

function build (part) {
  return new Promise((resolve, reject) => {
    switch (part) {
      case 'docs':
        const configDocs = require(path.resolve(__dirname, './webpack.config.docs.js'))
        webpack(configDocs, (err, stats) => {
          if (err) {
            reject(err)
          } else {
            resolve(stats)
          }
        })
        break
      case 'lib':
      default:
        const config = require(path.resolve(__dirname, './webpack.config.js'))
        webpack(config, (err, stats) => {
          if (err) {
            reject(err)
          } else {
            resolve(stats)
          }
        })
    }
  })
}
const tasks = []
if (process.argv.length < 4) {
  tasks.push(build('lib'))
  tasks.push(build('docs'))
} else {
  tasks.push(build(process.argv[3]))
}

console.log('Framevuerk is building...')
Promise.all(tasks).then((stats) => {
  console.log('Done!')
}).catch((err) => {
  throw new Error(err)
})
