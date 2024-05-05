import axios from 'axios';
import xml2js from 'xml2js';

import { GameDetailsType, GameCardType } from '../types/GameTypes';

async function searchBoardGame(query: string): Promise<GameCardType[]> {
    try {
        const response = await axios.get(`https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`);
        const parser = new xml2js.Parser();
        const xmlData = response.data;
        let jsonData = await parser.parseStringPromise(xmlData);

        if (jsonData.items.$.total === '0') {
            console.log('No results found for query:', query);
            return [];
        }
        const items = jsonData.items.item;
        const gamesIDs: string[] = items.map(item => item.$.id);

        const idsString = gamesIDs.join(',');
        const thingResponse = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${idsString}`);
        const thingParser = new xml2js.Parser();
        const thingXmlData = thingResponse.data;
        let thingJsonData = await thingParser.parseStringPromise(thingXmlData);

        const games: GameCardType[] = thingJsonData.items.item.map((game): GameCardType =>
        ({
            categories: game.link ? game.link.filter(link => link.$.type === 'boardgamecategory').map(link => link.$.value) : [],
            // description: game.description ? game.description[0] : "",
            imageUrl: game.image ? game.image[0] : undefined,
            title: game.name ? game.name[0].$.value : "",
            gameId: game.$.id ? game.$.id : ""
        })
        );
        return games;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function getBoardGameById(id: string) {
    try {
        const response = await axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`);

        const parser = new xml2js.Parser();
        const xmlData = response.data;
        let jsonData = await parser.parseStringPromise(xmlData);

        const item = jsonData.items.item[0];
        const gameData: GameDetailsType = {
            gameId: item.$.id,
            title: item.name && item.name.find((name: { $: { type: string } }) => name.$.type === 'primary') ? item.name.find((name: { $: { type: string } }) => name.$.type === 'primary').$.value : "",
            // thumbnail: item.thumbnail ? item.thumbnail[0] : "",
            imageUrl: item.image ? item.image[0] : "",
            description: item.description ? item.description[0] : "",
            yearPublished: item.yearpublished && item.yearpublished[0] ? item.yearpublished[0].$.value : "",
            players: { min: item.minplayers && item.minplayers[0] ? item.minplayers[0].$.value : "", max: item.maxplayers && item.maxplayers[0] ? item.maxplayers[0].$.value : "" },
            playtime: { min: item.minplaytime && item.minplaytime[0] ? item.minplaytime[0].$.value : "", max: item.maxplaytime && item.maxplaytime[0] ? item.maxplaytime[0].$.value : "" },
            minAge: item.minage && item.minage[0] ? item.minage[0].$.value : "",
            categories: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamecategory').map((link: { $: { value: string } }) => link.$.value) || [],
            mechanics: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamemechanic').map((link: { $: { value: string } }) => link.$.value) || [],
            designers: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamedesigner').map((link: { $: { value: string } }) => link.$.value) || [],
            artists: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgameartist').map((link: { $: { value: string } }) => link.$.value) || [],
            publishers: item.link && item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamepublisher').map((link: { $: { value: string } }) => link.$.value) || []
        };

        return gameData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { searchBoardGame, getBoardGameById }
