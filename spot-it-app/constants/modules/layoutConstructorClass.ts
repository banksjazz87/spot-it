import { ImageProperties } from '@/constants/interfaces';

class LayoutConstructor {
    images: ImageProperties[];

    constructor(images: ImageProperties[]) {
        this.images = images;
    }

    generateMatchingItem() {
        const maxNum = this.images.length;
        // return Math.floor(Math.random() * maxNum);
        const randomNum = Math.floor(Math.random() * 10);
        return maxNum;
    }
}


export default LayoutConstructor;