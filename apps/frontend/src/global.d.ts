interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // добавляйте сюда другие переменные, начинающиеся с VITE_
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
