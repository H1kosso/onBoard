import axios from 'axios';
import xml2js from 'xml2js';

async function searchBoardGame(query : string) {
    try {
        const response = await axios.get(`https://boardgamegeek.com/xmlapi2/search?query=${query}}`);

        const parser = new xml2js.Parser();
        const xmlData = response.data;
        let jsonData = await parser.parseStringPromise(xmlData);

        let gamesData = [];

        if (jsonData.items.$.total === '0') {
            console.log('Brak wyników dla zapytania:', query);
            return;
        }

        const items = jsonData.items.item;
        items.forEach(item => {
            gamesData.push({
                name: item.name[0].$.value,
                id: item.$.id,
                type: item.$.type,
                yearPublished: item.yearpublished[0].$.value
            });
        });

        return(JSON.stringify(gamesData, null, 2));
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
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
            name: item.name.find((name: { $: { type: string } }) => name.$.type === 'primary').$.value,
            thumbnail: item.thumbnail[0],
            image: item.image[0],
            description: item.description[0],
            yearPublished: item.yearpublished[0].$.value,
            minPlayers: item.minplayers[0].$.value,
            maxPlayers: item.maxplayers[0].$.value,
            playingTime: item.playingtime[0].$.value,
            minPlayTime: item.minplaytime[0].$.value,
            maxPlayTime: item.maxplaytime[0].$.value,
            minAge: item.minage[0].$.value,
            categories: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamecategory').map((link: { $: { value: string } }) => link.$.value),
            mechanics: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamemechanic').map((link: { $: { value: string } }) => link.$.value),
            designers: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamedesigner').map((link: { $: { value: string } }) => link.$.value),
            artists: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgameartist').map((link: { $: { value: string } }) => link.$.value),
            publishers: item.link.filter((link: { $: { type: string } }) => link.$.type === 'boardgamepublisher').map((link: { $: { value: string } }) => link.$.value)
        };

        console.log( JSON.stringify(gameData, null, 2));
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
    }
}

export { searchBoardGame, getBoardGameById }
