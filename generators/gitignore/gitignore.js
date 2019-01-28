module.exports = `

/node_modules/
/output/
/.nyc_output/
/coverage/

`.split(/\s+/).filter(_ => _ !== '');
