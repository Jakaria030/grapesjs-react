const ResetLocalStorageCommand = (editor) => {
  editor.Commands.add("reset-storage", {
    run: (editor) => {
      const sm = editor.StorageManager;

      if (sm && sm.getConfig().type === "local") {
        const key = "gjsProject";
        localStorage.removeItem(key);
      }

      editor.Components.clear();
    },
  });
};

export default ResetLocalStorageCommand;