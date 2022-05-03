import { store } from '../state/store'

describe('itemSets redux state test', () => {
    it('should set itemSetsSlice to initial state object', () => {
        const state = store.getState().itemSets
        expect(state).toEqual({
            itemSetsData: { item_sets: [] },
            loading: false,
            fulfilled: false,
            rejected: false,
            cache: {},
            testSetsData: { item_sets: [] }
        })
    })
})