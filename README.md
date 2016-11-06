# Dash Button HA
Home Automation system for the Amazon Dash Button on Node.

### Setup
This program uses [dash_button](https://github.com/ide/dash-button), a npm package by James Ide, to interact with the Amazon Dash Button.
  
It also uses Babel for ES2017, and `request` for API calls. Use `npm install` to install all packages:  
`npm install`  
  
#### Babel Configurations
If Babel is used, set the preset transformation as ES2017:  
  
`echo '{ "presets": ["es2017"] }' > .babelrc`

### Retrieving the MAC Address of the Amazon Dash Button
The dash-button package includes a script that can easily retrieve the MAC Address of Amazon Dash Buttons sending DHCP requests or ARP probes.  
  
To run it, add a scan script to the `scripts` section of package.json:  
  
```JSON
"scripts": {
  "scan": "dash-button scan"
}

```    
  
And run it with sudo:  
  
`sudo npm run scan`
  
If the server and Dash button is connected to a specific network interface that might require additional configurations, specificy the interface explicitly in the command line:  
  
`sudo npm run scan -- --interface en1`

### Running Dash-Button-HA
With Babel:  
  
`./node_modules/.bin/babel-node index.js`
  
You can also configure `npm start` to execute `index.js` with Babel. This is already added in package.json:
  
```JSON
"scripts": {
  "start": "./node_modules/.bin/babel-node index.js"
}
```  
  
#### Troubleshoot
If you see `Error: pcap_findalldevs didn't find any devs`, add `sudo` before `./node_modules/.bin/babel-node` and run again.

### Resources and Acknowledgements
- [dash-button](https://github.com/ide/dash-button) by James Ide
- [Babel ES2017](https://github.com/babel/example-node-server) example Node server
- [Recent changes](http://stackoverflow.com/a/39906246/3751589) to Amazon Dash Button's networking behaviors
