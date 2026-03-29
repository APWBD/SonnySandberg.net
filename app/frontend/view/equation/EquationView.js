import { importCSS, getRandomInt } from "/app/frontend/utils.js";

export default class EquationView
{
	#level = 1;
	#levels = ["Niveau", 1, 2];
	#leftSide = "2x";
	#rightSide = "18";

	#container;
	constructor(container)
	{
		importCSS("equation");
		importCSS("buttons");
		this.#container = container;
	}

	build()
	{
		const d = document;
		this.#container.innerHTML = "";

		const grid = d.createElement("div");
		grid.classList.add("grid");
		this.#container.appendChild(grid);

		const headline = d.createElement("div");
		headline.classList.add("headline");
		headline.textContent = "Ligning";
		grid.appendChild(headline);

		const level = d.createElement("div");
		level.classList.add("level");
		level.id = "level";
		grid.appendChild(level);

		const problem = d.createElement("div");
		problem.classList.add("problem");
		grid.appendChild(problem);

		const buttons = d.createElement("div");
		buttons.classList.add("buttons");
		buttons.id = "buttons";
		grid.appendChild(buttons);

		this.#buildLevels(level, problem);
		this.#buildProblem(problem);
		this.#buildButtons(buttons, problem);
	}

	#buildButtons(buttons, problem)
	{
		const d = document;
		const button = d.createElement("button");
		button.className = "std-button std-button-blue";
		button.innerHTML = "NY OPGAVE";
		button.addEventListener("click", e =>
		{
			this.#buildProblem(problem);
		});
		buttons.appendChild(button);
	}

	#buildLevels(level, problem)
	{
		const d = document;
		level.innerHTML = "";

		for (let l of this.#levels)
		{
			if (l == "Niveau")
			{
				let label = d.createElement("label");
				label.appendChild(d.createTextNode(l));
				level.appendChild(label);
			}
			else
			{
				let c = "std-button";
				c += (l == this.#level) ? " std-button-red" : " std-button-orange";
				const button = d.createElement("button");
				button.className = c;
				button.appendChild(d.createTextNode(l));


				button.addEventListener("click", e =>
				{
					this.#level = l;
					this.#buildLevels(level, problem);
					this.#buildProblem(problem);
				});
				level.appendChild(button);
			}
		}
	}

	#buildProblem(problem)
	{
		problem.innerHTML = "";

		if (this.#level == 1)
		{
			this.#levelOneProblem();
		}
		else if (this.#level == 2)
		{
			this.#levelTwoProblem();
		}

		problem.innerHTML = `${this.#leftSide} = ${this.#rightSide}`;
	}

	#levelOneProblem()
	{
		let result = getRandomInt(1, 10);
		let multiplier = getRandomInt(2, 10);

		this.#leftSide = `${multiplier}x`;
		this.#rightSide = result * multiplier;
	}

	#levelTwoProblem()
	{
		let result = getRandomInt(1, 10);
		let multiplier = getRandomInt(2, 10);
		let multiplier2 = getRandomInt(2, 10);

		this.#leftSide = `${multiplier}x + ${multiplier2}x`;
		this.#rightSide = `${getRandomInt(1, 10) * multiplier} + ${getRandomInt(1, 10) * multiplier2}`;
	}
}