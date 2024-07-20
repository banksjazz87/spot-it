import { ImageProperties } from '@/constants/interfaces';
import CharacterImages from '../CharacterImages';

class LayoutConstructor {
    images: ImageProperties[];

    constructor(images: ImageProperties[]) {
        this.images = images;
    }

    generateMatchingItem(): Number {
        const maxNum = this.images.length;
        // return Math.floor(Math.random() * maxNum);
        const randomNum = Math.floor(Math.random() * 10);
        return maxNum;
    }

    getRandomNumber(): number {
        const randomNum = Math.floor(Math.random() * (this.images.length));
        return randomNum;
    }

    getGrid(): ImageProperties[][] {
        let finalArray = [];
        let currentArray = [];

        for (let i = 0; i < this.images.length; i++) {
            if (i <= 49) {
               if (i % 7 === 0) {
                currentArray.push(this.images[i]);
                finalArray.push(currentArray);
                currentArray = [];
                } else {
                    currentArray.push(this.images[i]);
                } 
            }
        }

        return finalArray;
    }
}


export default LayoutConstructor;