export let isCordovaAvailable = () => {
	if (!(<any>window).cordova) {
		alert(' OneSignal nao funciona sem o celular, por favor use um dispositivo movel');
		return false;
	}
	return true;
};