jest.mock('expo/src/winter/ImportMetaRegistry', () => ({
  ImportMetaRegistry: {
    get url() {
      return null;
    },
  },
}));

jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    __esModule: true,
    getItemAsync: async (key: string): Promise<string | null> =>
      store.has(key) ? (store.get(key) ?? null) : null,
    setItemAsync: async (key: string, value: string): Promise<void> => {
      store.set(key, value);
    },
    deleteItemAsync: async (key: string): Promise<void> => {
      store.delete(key);
    },
    __resetSecureStoreForTests: (): void => store.clear(),
  };
});

jest.mock('expo-localization', () => ({
  __esModule: true,
  getLocales: () => [{ languageCode: 'en', languageTag: 'en-US' }],
}));

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (object) => JSON.parse(JSON.stringify(object));
}
