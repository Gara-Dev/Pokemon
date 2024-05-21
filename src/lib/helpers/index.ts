import fs from 'fs';
import path from 'path';

export function getPokedex() {
	return JSON.parse(
		fs.readFileSync(path.resolve(path.join('static', 'pokedex.json')), 'utf-8').toString()
	);
}
