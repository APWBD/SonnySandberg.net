import { importCSS, getRandomInt } from "/app/frontend/utils.js";
import MathExpressionsBuilder from "/app/frontend/controllers/MathExpressionsBuilder.js";

export default class EquationView
{
	#level = 1;
	#levels = ["Niveau", 1, 2, 3];
	#task;

	#container;
	#levelContainer;
	#problemContainer;
	#answerContainer;
	#stepsContainer;
	#buttonsContainer;

	#showingAnswer = false;
	#showingSteps = false;

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
		this.#showingAnswer = false;
		this.#showingSteps = false;

		const grid = d.createElement("div");
		grid.classList.add("grid");
		this.#container.appendChild(grid);

		const headline = d.createElement("div");
		headline.classList.add("headline");
		headline.textContent = "Ligninger";
		grid.appendChild(headline);

		const box = d.createElement("div");
		box.classList.add("box");
		grid.appendChild(box);

		this.#levelContainer = d.createElement("div");
		this.#levelContainer.classList.add("level");
		this.#levelContainer.id = "level";
		box.appendChild(this.#levelContainer);

		this.#problemContainer = d.createElement("div");
		this.#problemContainer.classList.add("problem");
		box.appendChild(this.#problemContainer);

		this.#answerContainer = d.createElement("div");
		this.#answerContainer.classList.add("answer");
		box.appendChild(this.#answerContainer);

		this.#stepsContainer = d.createElement("div");
		this.#stepsContainer.classList.add("steps");
		box.appendChild(this.#stepsContainer);

		this.#buttonsContainer = d.createElement("div");
		this.#buttonsContainer.classList.add("buttons");
		this.#buttonsContainer.id = "buttons";
		box.appendChild(this.#buttonsContainer);

		this.#buildLevels();
		this.#buildProblem();
		this.#buildSteps();
		this.#buildButtons();
	}

	#buildButtons()
	{
		const d = document;
		const newProblem = d.createElement("button");
		newProblem.className = "std-button std-button-blue";
		newProblem.innerHTML = "Ny opgave";
		newProblem.addEventListener("click", e =>
		{
			this.build();
		});
		this.#buttonsContainer.appendChild(newProblem);

		const showAnswer = d.createElement("button");
		showAnswer.className = "std-button std-button-green";
		showAnswer.innerHTML = "Vis svar";
		this.#buttonsContainer.appendChild(showAnswer);
		showAnswer.addEventListener("click", e =>
		{
			this.#showingAnswer = !this.#showingAnswer;
			if (this.#showingAnswer)
			{
				this.#answerContainer.style.display = "block";
				this.#stepsContainer.style.display = "none";
				showAnswer.innerHTML = "Skjul svar";
			}
			else
			{
				this.#answerContainer.style.display = "none";
				showAnswer.innerHTML = "Vis svar";
			}
		});

		const showSteps = d.createElement("button");
		showSteps.className = "std-button std-button-red";
		showSteps.innerHTML = "Hjælp";
		this.#buttonsContainer.appendChild(showSteps);
		showSteps.addEventListener("click", e =>
		{
			this.#showingSteps = !this.#showingSteps;
			if (this.#showingSteps)
			{
				this.#stepsContainer.style.display = "block";
				this.#answerContainer.style.display = "none";
				showSteps.innerHTML = "Skjul hjælp";
			}
			else
			{
				this.#stepsContainer.style.display = "none";
				this.#answerContainer.style.display = "none";
				showSteps.innerHTML = "Hjælp";
			}
		});

	}

	#buildLevels()
	{
		const d = document;
		this.#levelContainer.innerHTML = "";
		
		for (let l of this.#levels)
		{
			if (l == "Niveau")
			{
				let label = d.createElement("label");
				label.appendChild(d.createTextNode(l));
				this.#levelContainer.appendChild(label);
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
					this.build();
				});
				this.#levelContainer.appendChild(button);
			}
		}
	}

	#buildProblem()
	{
		this.#problemContainer.innerHTML = "";

		if (this.#level == 1)
		{
			let result = getRandomInt(1, 10);
			let multiplier = getRandomInt(2, 10);

			this.#problemContainer.innerHTML = `${multiplier}x = ${result * multiplier}`;
		}
		else
		{
			const mathExpressionsBuilder = new MathExpressionsBuilder();

			if (this.#level == 2)
			{
				this.#task = mathExpressionsBuilder.generateReductionTask(2);
				this.#problemContainer.innerHTML = this.#task.question;

			}

			if (this.#level == 3)
			{
				this.#task = mathExpressionsBuilder.generateReductionTask(3);
				this.#problemContainer.innerHTML = this.#task.question;
			}
		}
		this.#buildAnswer();
	}

	#buildAnswer()
	{
		this.#answerContainer.innerHTML = "";
		if (this.#level == 1)
		{
			const answer = this.#problemContainer.textContent.split("=")[1].trim() / parseInt(this.#problemContainer.textContent.split("x")[0].trim());
			this.#answerContainer.innerHTML = `x = ${answer}`;
		}
		else		
		{
			this.#answerContainer.innerHTML = `${this.#task.answer}`;
		}

	}

	#buildSteps()
	{
		this.#stepsContainer.innerHTML = "";

		const ol = document.createElement("ol");
		this.#stepsContainer.appendChild(ol);
		let steps;

		if (this.#level == 1)
		{
			steps = [
				`Isolér x ved at dividere begge sider med ${this.#problemContainer.textContent.split("x")[0].trim()}`,
			];
		}
		else
		{
			steps = [
				"Fjern parenteserne",
				"Saml x-led på hver side",
				"Saml tallene på hver side",
				"Flyt x-led til den ene side",
				"Isolér x"
			];
		}

		for (let step of steps)
		{
			const li = document.createElement("li");
			li.textContent = step;
			ol.appendChild(li);
		}
	}
}