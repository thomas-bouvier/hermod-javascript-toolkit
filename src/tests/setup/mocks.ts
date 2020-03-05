import fetchMock from 'fetch-mock'

global['SnipsToolkit'] = {
    fetch: fetchMock.sandbox(),
    config: {},
    setup: {},
    mock: {
        http(mockCallback: (mock: fetchMock.FetchMockSandbox) => void) {
            mockCallback(global['SnipsToolkit'].fetch)
        },
        config(mockCallback: (currentConfig: {[key: string]: any}) => void) {
            mockCallback(global['SnipsToolkit'].config)
        }
    }
}
