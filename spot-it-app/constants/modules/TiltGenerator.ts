/**
 * Used to create a tilt style
 */

class TiltGenerator {
	getRandomNum(): number {
		return Math.floor(Math.random() * 10);
	}

	getTilt(): Object | undefined {
		const randomNum = this.getRandomNum();

		if (randomNum % 3 === 0) {
			return {
				transform: [{ rotate: "135deg" }],
			};
		} else if (randomNum % 4 === 0) {
			return {
				transform: [{ rotate: "330deg" }],
			};
		} else if (randomNum % 5 === 0) {
			return {
				transform: [{ rotate: "25deg" }],
			};
		}
	};
}

export default TiltGenerator;