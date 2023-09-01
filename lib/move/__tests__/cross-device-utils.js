import fs from "graceful-fs";
import path from "path";
const { CROSS_DEVICE_PATH } = process.env;
let runCrossDeviceTests = !!CROSS_DEVICE_PATH;
if (runCrossDeviceTests) {
    // make sure we have permission on device
    try {
        fs.writeFileSync(path.join(CROSS_DEVICE_PATH, 'file'), 'hi');
    }
    catch {
        runCrossDeviceTests = false;
        throw new Error(`Can't write to device ${CROSS_DEVICE_PATH}`);
    }
}
else
    console.log('Skipping cross-device move tests');
export const ifCrossDeviceEnabled = (fn) => runCrossDeviceTests ? fn : fn.skip;
export { CROSS_DEVICE_PATH as differentDevice };
export default {
    differentDevice: CROSS_DEVICE_PATH,
    ifCrossDeviceEnabled
};
