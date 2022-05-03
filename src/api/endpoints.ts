const itemSetsIndexEndpoint = 'https://us.api.blizzard.com/data/wow/item-set/index?namespace=static-us&locale=en_US',
    itemSetEndpoint = 'https://us.api.blizzard.com/data/wow/item-set/{itemSetId}?namespace=static-us&locale=en_US',
    setItemEndpoint = 'https://us.api.blizzard.com/data/wow/item/{itemId}?namespace=static-us&locale=en_US',
    itemMediaEndpoint = 'https://us.api.blizzard.com/data/wow/media/item/{itemId}?namespace=static-us&locale=en_US',
    getTokenEndpoint = 'https://us.battle.net/oauth/token'

export { itemSetsIndexEndpoint, itemSetEndpoint, setItemEndpoint, itemMediaEndpoint, getTokenEndpoint }