import axios from 'axios';
import xml2js from 'xml2js';

async function searchBoardGame(query) {
    try {
        const response = await axios.get(`https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`);

        const parser = new xml2js.Parser();
        const xmlData = response.data;
        let jsonData = await parser.parseStringPromise(xmlData);

        let gamesIDs = [];

        if (jsonData.items.$.total === '0') {
            console.log('No results found for query:', query);
            return;
        }

        const items = jsonData.items.item;
        items.forEach(item => {
            gamesIDs.push(item.$.id);
        });

        const idsString = gamesIDs.join(',');

        const thingResponse = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${idsString}`);

        const thingParser = new xml2js.Parser();
        const thingXmlData = thingResponse.data;
        let thingJsonData = await thingParser.parseStringPromise(thingXmlData);

        let games = [];

        thingJsonData.items.item.forEach(game => {
            let gameData = {
                categories: game.link ? game.link.filter(link => link.$.type === 'boardgamecategory').map(link => link.$.value) : [],
                description: game.description ? game.description[0] : "",
                image: game.image ? game.image[0] : "",
                name: game.name ? game.name[0].$.value : "",
                id: game.$.id ? game.$.id : ""
            };
            games.push(gameData);
        });
        console.log(games)
        return games;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getBoardGameById(id: string) {
    try {
        const response = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`);

        const parser = new xml2js.Parser();
        const xmlData = response.data;
        let jsonData = await parser.parseStringPromise(xmlData);

        const item = jsonData.items.item[0];
        const gameData = {
            name: item.name && item.name.find((name: { $: { type: string } }) => name.$.type === 'primary') ? item.name.find((name: { $: { type: string } }) => name.$.type === 'primary').$.value : "",
            thumbnail: item.thumbnail ? item.thumbnail[0] : "",
            image: item.image ? item.image[0] : "",
            description: item.description ? item.description[0] : "",
            yearPublished: item.yearpublished && item.yearpublished[0] ? item.yearpublished[0].$.value : "",
            minPlayers: item.minplayers && item.minplayers[0] ? item.minplayers[0].$.value : "",
            maxPlayers: item.maxplayers && item.maxplayers[0] ? item.maxplayers[0].$.value : "",
            playingTime: item.playingtime && item.playingtime[0] ? item.playingtime[0].$.value : "",
            minPlayTime: item.minplaytime && item.minplaytime[0] ? item.minplaytime[0].$.value : "",
            maxPlayTime: item.maxplaytime && item.maxplaytime[0] ? item.maxplaytime[0].$.value : "",
            minAge: item.minage && item.minage[0] ? item.minage[0].$.value : "",
            categories: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamecategory').map((link: { $: { value: string } }) => link.$.value) || [],
            mechanics: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamemechanic').map((link: { $: { value: string } }) => link.$.value) || [],
            designers: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamedesigner').map((link: { $: { value: string } }) => link.$.value) || [],
            artists: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgameartist').map((link: { $: { value: string } }) => link.$.value) || [],
            publishers: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamepublisher').map((link: { $: { value: string } }) => link.$.value) || []
        };

        console.log( JSON.stringify(gameData, null, 2));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { searchBoardGame, getBoardGameById }
