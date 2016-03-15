/**
@module preloader wallet
*/
const path = require('path')
const mist = require('../mistAPI.js');
require('../openExternal.js');
const BigNumber = require('bignumber.js');
const Web3 = require('web3');
const ipcProviderWrapper = require('../ipc/ipcProviderWrapper.js');
const web3Admin = require('../web3Admin.js');


// disable pinch zoom
require('web-frame').setZoomLevelLimits(1, 1);


// make variables globally accessable
// window.dirname = __dirname;
window.BigNumber = BigNumber;
window.web3 = new Web3(new Web3.providers.IpcProvider('', ipcProviderWrapper));

// set the base path for relative assets in production mode
if(require('remote').getGlobal('production')){
  var base = document.createElement('base');
  base.href = path.resolve(__dirname + '/../../interface/wallet') + '/';
  document.getElementsByTagName('head')[0].appendChild(base);
}

// add admin later
setTimeout(function(){
    web3Admin.extend(window.web3);
}, 1000);

// prevent overwriting the Dapps Web3
delete global.Web3;
delete window.Web3;

window.mist = mist(true);
window.platform = process.platform;

setTimeout(function(){
    if(document.getElementsByTagName('html')[0])
        document.getElementsByTagName('html')[0].className =  window.platform;
}, 500);
