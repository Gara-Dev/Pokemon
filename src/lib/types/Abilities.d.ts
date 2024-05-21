import type { Ability } from './Ability';

export interface Abilities {
	ability1: Ability;
	ability2: Ability | undefined;
	hidden: Ability | undefined;
}
