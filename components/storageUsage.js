const checkDiskSpace = require('check-disk-space').default;
const os = require('os');

exports.update = async () => {
    switch (os.platform()) {	
        case 'win32':
            // Detected OS Windows
            data = await checkDiskSpace('C:').then((diskSpace) => {
                return diskSpace
            })
            break;
        case 'linux':
            // Detected OS Linux
            data = await checkDiskSpace('/').then((diskSpace) => {
                return diskSpace
            })
            break;
        case 'darwin':
            // Detected OS Mac OS
            data = await checkDiskSpace('/').then((diskSpace) => {
                return diskSpace
            })
            break;
        default:
            data = null;
            break;
    }
    if (data != null) {
        let payload = `:floppy_disk: **Storage Usage:** ${Math.round(((data.size-data.free)/1000000000)*100)/100} GB / ${Math.round((data.size/1000000000)*100 )/100} GB`;
        return payload;
    }
    else {
        let payload = `:floppy_disk: **Storage Usage:**: No Storage found.`;
        return payload;
    }
}
