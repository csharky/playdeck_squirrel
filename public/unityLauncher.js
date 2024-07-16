window.parent?.window?.postMessage({ playdeck: { method: "loading", value: 0.0001 } }, "*");

window.onload = () => {
    var root = document.getElementById("unity-container");
    var canvas = document.createElement("canvas");
    canvas.id = "unity-canvas";

    root.appendChild(canvas);
    
    var buildUrl = "UnityBuild";
    var loaderUrl = buildUrl + "/Game.loader.js";
    var config = {
        dataUrl: buildUrl + "/799120ea3eb2b627bf0b4e017cba8508.data.br",
        frameworkUrl: buildUrl + "/0344015a1b347e34a7839213400ed259.js.br",
        codeUrl: buildUrl + "/fb33854977bb324d24090c4f9cf8738d.wasm.br",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "TONPlay",
        productName: "PlayDeck Fluffy",
        productVersion: "1.0.0",
    };

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var isAndroid = /Android/i.test(navigator.userAgent);

    if (isMobile) {
        const maxPixelRatioMobile = 2.0;
        if (isAndroid) {
            config.devicePixelRatio = Math.min(window.devicePixelRatio, maxPixelRatioMobile * 0.8);
        } else {
            config.devicePixelRatio = Math.min(window.devicePixelRatio, maxPixelRatioMobile);
        }
    }

    var unityGame;
    var script = document.createElement("script");
    script.src = loaderUrl;
    script.type = "text/javascript";
    script.onload = function () {
        createUnityInstance(canvas, config, function (progress) {
            window.parent?.window?.postMessage({ playdeck: { method: "loading", value: progress * 95 } }, "*");
        }).then(function (unityInstance) {
            unityGame = unityInstance;
            createSubscription(unityInstance);
        }).catch(function (message) {
            alert(message);
        });
    };
    document.body.prepend(script);
    
    const createSubscription = (unityInstance) => {
        addEventListener("message", (message) => {
            const wrapper = message?.data?.wrapper;

            if (!wrapper) return;

            if (wrapper.method === "play") {
                unityInstance?.SendMessage("GameController", "StartGame", wrapper.audio ? 1 : 0);
            }
        })
    }
};
