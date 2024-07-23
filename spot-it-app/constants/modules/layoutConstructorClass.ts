import { ImageProperties } from '@/constants/interfaces';
import CharacterImages from '../CharacterImages';

class LayoutConstructor {
    images: ImageProperties[];

    constructor(images: ImageProperties[]) {
        this.images = images;
    }

    getRandomNumber(): number {
        const randomNum = Math.floor(Math.random() * (this.images.length));
        return randomNum;
    }

}


export default LayoutConstructor;