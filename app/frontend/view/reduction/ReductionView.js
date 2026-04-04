import MathExpressionsBuilder from "/app/frontend/controllers/MathExpressionsBuilder.js";

export default class ReductionView 
{
    constructor(container) 
    {
        this.container = container;

        const mathExpressionsBuilder = new MathExpressionsBuilder();
        console.log(mathExpressionsBuilder.generateReductionTask(3));
    }
}