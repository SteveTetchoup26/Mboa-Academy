import {
  s
} from "./chunk-WADCYXO5.js";
import "./chunk-5WW76PVZ.js";

// node_modules/.pnpm/primevue@4.5.3_vue@3.5.25_typescript@5.6.3_/node_modules/primevue/toasteventbus/index.mjs
var ToastEventBus = s();

// node_modules/.pnpm/primevue@4.5.3_vue@3.5.25_typescript@5.6.3_/node_modules/primevue/usetoast/index.mjs
var PrimeVueToastSymbol = Symbol();

// node_modules/.pnpm/primevue@4.5.3_vue@3.5.25_typescript@5.6.3_/node_modules/primevue/toastservice/index.mjs
var ToastService = {
  install: function install(app) {
    var ToastService2 = {
      add: function add(message) {
        ToastEventBus.emit("add", message);
      },
      remove: function remove(message) {
        ToastEventBus.emit("remove", message);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit("remove-group", group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit("remove-all-groups");
      }
    };
    app.config.globalProperties.$toast = ToastService2;
    app.provide(PrimeVueToastSymbol, ToastService2);
  }
};
export {
  ToastService as default
};
//# sourceMappingURL=primevue_toastservice.js.map
