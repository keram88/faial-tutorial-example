const core = require('@actions/core');
const tc = require('@actions/tool-cache');

function getBundle(branch) {
    let file = "faial.tar.bz2";
    let url = "https://gitlab.com/umb-svl/faial/-/jobs/8977975014/artifacts/file/bundle/faial.tar.bz2"
    return { url: url, file: file };
}

(async function () {
    try {
        const version = core.getInput('version', { required: true });
        const bundle = getBundle(version);
        const path = await tc.downloadTool(bundle.url);
        const dir = await tc.extractTar(path, null, "jx");
        const cachedPath = await tc.cacheDir(dir, 'faial', version);
        // place faial-drf in the PATH
        core.addPath(cachedPath);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
