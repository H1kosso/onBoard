import axios from 'axios';
import xml2js from 'xml2js';

import { GameDetailsType, GameCardType } from '../types/GameTypes';

async function searchBoardGame(query: string): Promise<GameCardType[]> {
    try {
        const response = await axios.get(`https://boardgamegeek.com/xmlapi2/search?query=${query}}`);

        const parser = new xml2js.Parser();
        const xmlData = response.data;
        let jsonData = await parser.parseStringPromise(xmlData);

        let gamesData: GameCardType[] = [];

        if (jsonData.items.$.total === '0') {
            console.log('Brak wyników dla zapytania:', query);
            return [];
        }

        const items = jsonData.items.item;
        gamesData = items.map((item: any): GameCardType => (
            {
                title: item.name[0].$.value,
                gameId: item.$.id,
                category: "Action", // item.yearpublished[0].$.value // sometimes it's undefined,
                imageUrl: "https://cf.geekdo-images.com/vbWhXsB-FHNxJWrUAFEjTg__thumb/img/sSvH-SbDEC-2zF5BvDGNxsytGFs=/fit-in/200x150/filters:strip_icc()/pic231219.jpg"
            })
        );

        return gamesData;
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
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
            title: item.name.find((name: { $: { type: string } }) => name.$.type === 'primary').$.value,
            //thumbnail: item.thumbnail[0],
            imageUrl: item.image[0],
            description: item.description[0],
            yearPublished: item.yearpublished[0].$.value,
            players: { min: item.minplayers[0].$.value, max: item.maxplayers[0].$.value },
            //playingTime: item.playingtime[0].$.value,
            playtime: { min: item.minplaytime[0].$.value, max: item.maxplaytime[0].$.value },
            minAge: item.minage[0].$.value,
            categories: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamecategory').map((link: { $: { value: string } }) => link.$.value),
            mechanics: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamemechanic').map((link: { $: { value: string } }) => link.$.value),
            designers: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamedesigner').map((link: { $: { value: string } }) => link.$.value),
            artists: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgameartist').map((link: { $: { value: string } }) => link.$.value),
            publishers: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamepublisher').map((link: { $: { value: string } }) => link.$.value)
        };

        // console.log( JSON.stringify(gameData, null, 2));
        return gameData;
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
    }
}

export { searchBoardGame, getBoardGameById }
