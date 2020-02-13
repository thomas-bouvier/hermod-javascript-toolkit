import fetchMock from 'fetch-mock'

global['HermodToolkit'] = {
    fetch: fetchMock.sandbox(),
    config: {},
    setup: {},
    globals: {},
    mock: {
        http(mockCallback: (mock: fetchMock.FetchMockSandbox) => void) {
            mockCallback(global['HermodToolkit'].fetch)
        },
        config(mockCallback: (currentConfig: {[key: string]: any}) => void) {
            mockCallback(global['HermodToolkit'].config)
        },
        globals(mockCallback: (currentGlobals: {[key: string]: any}) => void) {
            mockCallback(global['HermodToolkit'].globals)
        }
    }
}
