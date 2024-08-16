import { ImageProperties } from '@/constants/interfaces';
import CharacterImages from '../lib/CharacterImages';

class LayoutConstructor {
	images: ImageProperties[];
	grid: ImageProperties[][];

	constructor(images: ImageProperties[] = [{key: "", url: "", description: ""}], grid: ImageProperties[][] = [[{ key: "", url: "", description: "" }]]) {
		this.images = images;
		this.grid = grid;
	}

	getRandomNumber(): number {
		const randomNum = Math.floor(Math.random() * this.images.length);
		return randomNum;
	}

	setTopRow(arrCount: number, count: number): Object | undefined {
		if (arrCount === 0 && count === 1) {
			return {
				right: -20,
				bottom: -15,
			};
		}
	}

	setMiddleRow = (count: number): Object | undefined => {
		if (this.images.length === 4) {
			if (count === 0) {
				return {
					top: -40,
					left: 5,
				};
			} else if (count === this.images.length - 1) {
				return {
					bottom: -40,
					right: 5,
				};
			}
		}
	}

	setBottomRow = (arrCount: number, count: number): Object | undefined => {
		if (this.grid.length - 1 === arrCount) {
			if (count === 0) {
				return {
					top: -20,
					left: -25,
				};
			}
		}
	}
}


export default LayoutConstructor;