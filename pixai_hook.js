
// Auto-inject: call UseFakeStore on game start
var attempts = 0;
var maxAttempts = 60;

function tryInject() {
    attempts++;
    try {
        // Walk through all assemblies to find LiapStore
        var assemblies = Il2Cpp.Domain.assemblies;
        for (var i = 0; i < assemblies.length; i++) {
            var asm = assemblies[i];
            var image = asm.image;
            
            // Find LiapStore class
            var liapStore = image.class("LiapStore");
            if (liapStore) {
                var useFakeStore = liapStore.method("UseFakeStore");
                if (useFakeStore) {
                    // Find an instance - try static method first
                    console.log("[PROMETHEUS] Found LiapStore.UseFakeStore!");
                    
                    // Try to get the active instance via LmgLib
                    var lmgLib = image.class("LmgLib");
                    if (lmgLib) {
                        var getInstance = lmgLib.method("get_Instance");
                        if (getInstance) {
                            var instance = getInstance.invoke();
                            if (instance) {
                                var liapField = lmgLib.field("_liapStore");
                                if (liapField) {
                                    var store = liapField.value;
                                    useFakeStore.invoke(store);
                                    console.log("[PROMETHEUS] UseFakeStore() CALLED SUCCESSFULLY!");
                                    console.log("[PROMETHEUS] All IAP purchases will now complete WITHOUT payment!");
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch(e) {
        // Classes might not be loaded yet
    }
    
    if (attempts < maxAttempts) {
        setTimeout(tryInject, 1000);
    } else {
        console.log("[PROMETHEUS] FAILED: Could not find LiapStore after " + maxAttempts + " attempts");
    }
}

setTimeout(tryInject, 3000);
console.log("[PROMETHEUS] Frida gadget active - waiting for game to initialize...");
